import yaml from 'yaml';
import fs from 'fs-extra';
import path from 'path';


export function getYamlPath(filePath: string) {
    const parse = path.parse(filePath);
    const newPath = path.join(parse.dir, parse.name);

    const yamlPath = newPath + '.yaml'
    if (fs.existsSync(yamlPath)) return yamlPath;

    const ymlPath = newPath + '.yml'
    if (fs.existsSync(ymlPath)) return ymlPath;
}

export default function getYamlContent(filePath: string) {
    const yamlPath = getYamlPath(filePath);
    if (yamlPath) {
        return yaml.parse(fs.readFileSync(filePath, 'utf8'));
    }
}
