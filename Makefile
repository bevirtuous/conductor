PACKAGES = conductor react-conductor redux-conductor

release:
		make clean
		make build

clean:
		make clean-logs
		make build-clean
		make clean-modules
		rm -rf ./.cache-loader/
		lerna bootstrap

clean-modules:
		lerna clean --yes
		rm -rf ./node_modules/

clean-logs:
		find . -name "*error.log" -type f -delete
		find . -name "*debug.log" -type f -delete

build:
		make build-clean
		make build-lerna
		make build-packages
		make build-copypkg
		make publish

build-clean:
		$(foreach package, $(PACKAGES), $(call do-build-clean, $(package)))

build-lerna:
		lerna publish --exact --skip-npm

build-packages:
		$(foreach package, $(PACKAGES), $(call do-build, $(package)))

build-copypkg:
		$(foreach package, $(PACKAGES), $(call do-copypkg, $(package)))

publish:
		$(eval VERSION=$(shell cat ./lerna.json | grep version | head -1 | awk -F: '{ print $$2 }' | sed 's/[\",]//g' | tr -d '[[:space:]]'))
		$(eval SUBSTR=$(findstring beta, $(VERSION)))
		$(foreach package, $(PACKAGES), $(call do-publish, $(package), $(SUBSTR)))
		make build-clean

define do-build
		npx babel ./packages/$(strip $(1))/src/ --out-dir ./packages/$(strip $(1))/dist --ignore tests,spec.js,spec.jsx,__snapshots__,.eslintrc.js,jest.config.js,dist,coverage,node_modules

endef

define do-build-clean
		cd ./packages/$(strip $(1))/ && rm -rf ./dist/

endef

define do-copypkg
		cp ./packages/$(strip $(1))/package.json ./packages/$(strip $(1))/dist/
		cp ./packages/$(strip $(1))/README.md ./packages/$(strip $(1))/dist/
		cp ./packages/$(strip $(1))/index.d.ts ./packages/$(strip $(1))/dist/

endef

define do-publish
		@if [ "$(strip $(2))" == "beta" ]; \
			then npm publish ./packages/$(strip $(1))/dist/ --access public --tag beta; \
			else npm publish ./packages/$(strip $(1))/dist/ --access public; \
		fi;


endef
