PACKAGES = conductor conductor-events conductor-helpers react-conductor react-conductor-transitions redux-conductor

release:
		make clean
		make build

clean:
		make clean-logs
		make clean-modules
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
		make build-copypkg
		$(foreach package, $(PACKAGES), $(call do-build, $(package)))

build-clean:
		$(foreach package, $(PACKAGES), $(call do-build-clean, $(package)))

build-lerna:
		lerna publish --skip-npm

build-copypkg:
		$(foreach package, $(PACKAGES), $(call do-copypkg, $(package)))

define do-build
		BABEL_ENV=production ./node_modules/.bin/babel ./packages/$(strip $(1))/src/ --out-dir ./packages/$(strip $(1))/dist --ignore tests,spec.js,spec.jsx,__snapshots__,.eslintrc.js,jest.config.js,dist,coverage,node_modules

endef

define do-build-clean
		cd ./packages/$(strip $(1))/ && rm -rf ./dist/

endef

define do-copypkg
		cp ./packages/$(strip $(1))/package.json ./packages/$(strip $(1))/dist/
		cp ./packages/$(strip $(1))/README.md ./packages/$(strip $(1))/dist/

endef