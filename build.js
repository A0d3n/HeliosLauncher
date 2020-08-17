const builder = require('electron-builder')
const Platform = builder.Platform

function getCurrentPlatform(){
    switch(process.platform){
        case 'win32':
            return Platform.WINDOWS
        case 'darwin':
            return Platform.MAC
        case 'linux':
            return Platform.linux
        default:
            console.error('Impossible de trouver une solution pour la plate-forme actuelle !')
            return undefined
    }
}

builder.build({
    targets: (process.argv[2] != null && Platform[process.argv[2]] != null ? Platform[process.argv[2]] : getCurrentPlatform()).createTarget(),
    config: {
        appId: 'ombrevallauncher',
        productName: 'Ombreval Launcher',
        artifactName: '${productName}.${ext}',
        copyright: 'Copyright © 2020-2021 A0d3n',
        directories: {
            buildResources: 'build',
            output: 'dist'
        },
        win: {
            target: [
                {
                    target: 'nsis',
                    arch: 'x64'
                }
            ]
        },
        nsis: {
            oneClick: false,
            perMachine: false,
            allowElevation: true,
            allowToChangeInstallationDirectory: true
        },
        mac: {
            target: 'dmg',
            category: 'public.app-category.games'
        },
        linux: {
            target: 'AppImage',
            maintainer: 'A0d3n',
            vendor: 'A0d3n',
            synopsis: 'Launcher Minecraft Moddé',
            description: 'Lanceur personnalisé qui permet aux utilisateurs de rejoindre les serveurs moddés. Tous les mods, configurations et mises à jour sont gérés automatiquement.',
            category: 'Game'
        },
        compression: 'maximum',
        files: [
            '!{dist,.gitignore,.vscode,docs,dev-app-update.yml,.travis.yml,.nvmrc,.eslintrc.json,build.js}'
        ],
        extraResources: [
            'libraries'
        ],
        asar: true
    }
}).then(() => {
    console.log('Construction complète !')
}).catch(err => {
    console.error('Erreur lors de la construction !', err)
})