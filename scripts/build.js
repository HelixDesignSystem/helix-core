#!/usr/bin/env node

const fs = require('fs-extra')
const globby = require('globby')
const path = require('path')
const yaml = require('js-yaml')

const ROOT_DIR = path.resolve(__dirname, '..')
const BUILD_DIR = path.resolve(ROOT_DIR, '_build/')

async function _yaml2json (srcPath) {
    let src = path.resolve(ROOT_DIR, srcPath)
    let basename = path.basename(srcPath, '.yml')
    let destPath = path.resolve(BUILD_DIR, `${basename}.json`)

    let data = yaml.safeLoad(await fs.readFile(src))

    await fs.ensureDir(BUILD_DIR)
    await fs.writeFile(destPath, JSON.stringify(data, null, 2))
}

async function buildFromYaml () {
    let paths = await globby('src/*.yml')
    await paths.map(_yaml2json)
}

(async function () {
    buildFromYaml()
})()
