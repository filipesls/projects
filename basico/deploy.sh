#!/bin/bash

version="0.1.0"

showHelp() {
    # clear
    echo "IMOI $version"
    echo
    echo "Usage: $0 [option]"
    echo
    echo 'Option:'
    echo '  -h | --help            This help file'
    echo '  -d | --deploy          Copies ./dist folder to @imoi-1.dev.infra:/usr/share/nginx/html/frontend'
    # echo '  -w | --whatever        does whatever'
    echo
}

# https://linuxacademy.com/blog/linux/conditions-in-bash-scripting-if-statements/
if [[ $1 == "" ]]
then
    showHelp
else
    for i in "$@"
    do
        case $i in

            -h|--help)
                showHelp
                exit
                ;;

            -d|--deploy )
                if [ -z "$1" ]||[ -z "$2" ]
                then
                    echo " usage:"
                    echo " deploy.sh -r user"
                    exit 1
                else
                    echo " Deploying using user" $2
                    # rsync -zvrh --exclude-from=".gitignore" --exclude=".git" . "${2%%}"
                    rsync -e ssh -rt \
                    --exclude=_* \
                    --exclude=.git* \
                    --modify-window=2 \
                    --chmod=g+rwx \
                    --stats -vp ./dist/* $2@imoi-1.dev.infra:/usr/share/nginx/html/frontend
                fi
                exit
                ;;
            *)
                # unknown option
                showHelp
                exit 1
            ;;
        esac
    done
fi


