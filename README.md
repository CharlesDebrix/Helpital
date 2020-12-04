# Helpital

## Description

Helpital est un logiciel d'optimisation et d'organisation destiné aux hôpitaux. Nous essayons de résoudre les problèmes de communication dans les hôpitaux en proposant un logiciel simple d'utilisation et qui leur correspond. Le but est donc de réunir toutes les fonctionnalitées des logiciels existant en un seul.

## But du projet

Permettre aux hôpitaux d'être plus efficaces en gagnant du temps en améliorant leur gestion. Fournir un outil qui permettrais au système hospitalier d'utiliser les supports technologiques à sa disposition.
Par exemple fournir un annuaire informatisé qui remplacerait les annuaires papiers présent dans les hopitaux. Créer un outil qui permet aux différents services de communiquer plus facilement et rapidement que par fax, comme c'est le cas dans certains hôpitaux. Numériser les actions et les procédures déjà présentes pour accroitre leur traitement: le transfert de patients entre services, redirection d'appels, gestion des inventaires des services, gestion des emplois du temps, la gestion des lits disponibles dans lesservices, disponibilités du corps médicales(docteur, infirmiers, internes), ...

# Helpital installation setup

### Fedora

First, you need to install node:

```sh
$ dnf install nodejs
```

then you need to clone the project's repository

```sh
$ git clone git@github.com:CharlesDebrix/Helpital.git
```

Enter into the repository and type

```sh
npm install
```

### Windows

First, you need to install node:

```sh
https://nodejs.org/dist/v14.15.1/node-v14.15.1-x64.msi
```

You need to setup the environment path to your nodejs folder.

To do so, 

Press the windows button, type 

```sh
environnement
```

a window will open and there will be a button nammed

```sh
Variable d'environnement
```
Click it.

You should be able to modify system environment variable.

Find the path variable in system's variable, then add your node directory.

Then, you need to install git for windows

```sh
https://github.com/git-for-windows/git/releases/download/v2.29.2.windows.2/Git-2.29.2.2-64-bit.exe
```
and to clone the project's repository

```sh
$ git clone git@github.com:CharlesDebrix/Helpital.git
```

Enter into the repository and type

```sh
npm install
```

