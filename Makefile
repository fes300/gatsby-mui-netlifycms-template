ifeq ($(OS),Windows_NT)
    uname_S := Windows
else
    uname_S := $(shell uname -s)
endif

ifeq ($(uname_S), Darwin)
    target = rename-mac-project
endif
ifeq ($(uname_S), Linux)
    target = rename-linux-project
endif

rename: 	
	@echo "detected OS" $(uname_S); \
    if [ $(uname_S) = "Linux" ] || [ $(uname_S) = "Darwin" ]; then \
		sh scripts/$(target).sh $(name); \
        echo "renamed to" $(name); \
	else \
		echo "OS not supported"; \
    fi

start: 	stop
	sh scripts/start.sh \


stop: 	
	sh scripts/stop.sh

start-and-rebuild: 	stop
	sh scripts/start.sh --build; \
