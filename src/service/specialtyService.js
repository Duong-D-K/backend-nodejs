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
                await db.Specialty.create({
                    name: data.name,
                    image: data.imageBase64,
                    contentMarkdown: data.contentMarkdown,
                    contentHTML: data.contentHTML,
                });

                resolve({
                    code: 0,
                    message: "Save New Specialty Sucessful!"
                })
            }

        } catch (e) {
            reject(e);
        }
    })
}


module.exports = {
    createSpecialty: createSpecialty
}