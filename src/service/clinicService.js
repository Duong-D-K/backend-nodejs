import db from "../models/index";
require('dotenv').config();
import _ from "lodash";
import emailService from "./emailService";
import { v4 as uuidv4 } from 'uuid';

let createClinic = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let requiredFields = ["name", "address", "imageBase64", "descriptionMarkdown", "descriptionHTML", "districtId", "provinceId"];

            if (requiredFields.some(field => !data[field])) {
                let missingField = requiredFields.find(field => !data[field]);

                resolve({
                    code: 1,
                    message: `Missing Parameter: ${missingField}`,
                })
            } else {
                let [, created] = await db.Clinic.findOrCreate({
                    where: {
                        name: data.name,
                    },
                    defaults: {
                        name: data.name,
                        address: data.address,
                        provinceId: data.provinceId,
                        districtId: data.districtId,
                        descriptionMarkdown: data.descriptionMarkdown,
                        descriptionHTML: data.descriptionHTML,
                        image: data.imageBase64,
                    }
                });

                if (created === true) {
                    resolve({
                        code: 0,
                        message: "Create New Clinic Sucessful!"
                    })
                } else {
                    resolve({
                        code: 2,
                        message: "The Clinic already exists!"
                    })
                }
            }

        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    createClinic: createClinic,
}