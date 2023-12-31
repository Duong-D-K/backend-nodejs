import db from "../models/index";
require('dotenv').config();
import _ from "lodash";
import emailService from "./emailService";
import { v4 as uuidv4 } from 'uuid';

let createSpecialty = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let requiredFields = ["name", "imageBase64", "contentMarkdown", "contentHTML"];

            if (requiredFields.some(field => !data[field])) {
                resolve({
                    code: 1,
                    message: "Missing required parameter!!",
                });
            } else {
                let [, created] = await db.Specialty.findOrCreate({
                    where: {
                        name: data.name,
                    },
                    defaults: {
                        name: data.name,
                        image: data.imageBase64,
                        contentMarkdown: data.contentMarkdown,
                        contentHTML: data.contentHTML,
                    }
                });
                if (created === true) {
                    resolve({
                        code: 0,
                        message: "Create New Specialty Sucessful!"
                    })
                } else {
                    resolve({
                        code: 2,
                        message: "The specialty already exists!"
                    })
                }
            }

        } catch (e) {
            reject(e);
        }
    })
}

let getAllSpecialties = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Specialty.findAll();

            if (data?.length > 0) {//change image to base 64
                data.map(item => {
                    item.image = new Buffer(item.image, "base64").toString("binary");
                    return item;
                })
            }

            resolve({
                code: 0,
                data: data?.length > 0 ? data : "",
            });
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    createSpecialty: createSpecialty,
    getAllSpecialties: getAllSpecialties
}