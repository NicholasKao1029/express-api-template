#!/usr/bin/env bash
set -e

MODELNAME=$1

# model name 
if [ -z "$MODELNAME" ] 
then
    echo "No model name given"
    exit 1
fi

# echo "attempting to commit for safety"
# git add . && git commit -m "feat: generation of model $MODELNAME" || { echo 'my_command failed' ; exit 1; }


echo "generating controller, service, dao files for model $MODELNAME"
echo ""
echo ""


# template paths
TEMPLATEPATHCONTROLLER='./src/controllers/user.js'
TEMPLATEPATHSERVICE='./src/services/user.js'
TEMPLATEPATHDAO='./src/daos/user.js'

templatePaths=(
    $TEMPLATEPATHCONTROLLER   
    $TEMPLATEPATHSERVICE
    $TEMPLATEPATHDAO
)

# template paths

CONTROLLERPATH='./src/controllers/'
SERVICEPATH='./src/services/'
DAOPATH='./src/daos/'

JSFILEEXT='.js'
TESTFILEEXT='.spec.js'

paths=(
    $CONTROLLERPATH
    $SERVICEPATH
    $DAOPATH
)


# TODO: abstract into func then use with test generation below
echo "Attempt to generating src files"
# generate files in src
for i in "${!paths[@]}"
do
    path="${paths[i]}"

    templatePath="${templatePaths[i]}"

    FILE=$path$MODELNAME$JSFILEEXT

    if test -f "$FILE"; then
        echo "$FILE exists. Not generated"
    else
        echo "$FILE doesn't exist. Generating from template $templatePath"
        cp "$templatePath" "$FILE"
    fi

done

echo ""
echo ""

#### TEST STUFF ####

# # test template
# TEMPLATEPATHCONTROLLERTEST='./template/controller_template.spec.js'
# TEMPLATEPATHSERVICETEST='./template/service_template.spec.js'
# TEMPLATEPATHDAOTEST='./template/dao_template.spec.js'

# testTemplatePaths=(
#     $TEMPLATEPATHCONTROLLERTEST
#     $TEMPLATEPATHSERVICETEST
#     $TEMPLATEPATHDAOTEST
# )
# # test template

# CONTROLLERPATHTEST='./tests/unit/controllers/'
# SERVICEPATHTEST='./tests/unit/services/'
# DAOPATHTEST='./tests/unit/daos/'

# testpaths=(
#     $CONTROLLERPATHTEST
#     $SERVICEPATHTEST
#     $DAOPATHTEST
# )


# echo "Attempt to generating test files"
# for i in "${!testpaths[@]}"
# do
#     path="${testpaths[i]}"

#     templatePath="${testTemplatePaths[i]}"

#     FILE=$path$MODELNAME$TESTFILEEXT

#     if test -f "$FILE"; then
#         echo "$FILE exists. Not generated"
#     else
#         echo "$FILE doesn't exist. Generating from template $templatePath"
#         cp "$templatePath" "$FILE"
#     fi

# done

echo 'Generation completed. exiting.' 
