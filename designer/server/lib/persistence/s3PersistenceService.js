// @flow
import S3 from 'aws-sdk/clients/s3'
import config from '../../../config'
import { PersistenceService } from './persistenceService'
import { Logger } from '@xgovformbuilder/model'

export class S3PersistenceService implements PersistenceService {
  logger: any
  bucket: any

  constructor (server: any, options: any) {
    this.logger = new Logger(server.log, 'S3PersistenceService')
    this.bucket = new S3({
      region: 'eu-west-2',
      params: { Bucket: config.s3Bucket }
    })
  }

  async listAllConfigurations () {
    // TODO:- flow does not like try catch.. boo
    const response = await this.bucket.listObjects().promise()
    if (response.error) {
      this.logger.error(`error listing all configurations ${response.error.message}`)
      return response.error
    }
    return response.Contents
  }

  async getConfiguration (id: string) {
    const response = await this.bucket.getObject({ Key: `${id}.json` }).promise()
    if (response.error) {
      this.logger.error(`error getting configuration with id: ${id}, ${response.error.message}`)
      return response.error
    } else {
      return Buffer.from(response.Body).toString('utf-8')
    }
  }

  async uploadConfiguration (id: string, configuration: any) {
    const response = await this.bucket.upload({ Key: id, Body: configuration }).promise()
    if (response.error) {
      this.logger.error(`error uploading configuration with id: ${id} ${response.error.message}`)
    }
    return response
  }

  async copyConfiguration (configurationId: string, newName: string) {
    const response = await this.bucket.copyObject({
      CopySource: encodeURI(`${this.bucket.config.params.Bucket}/${configurationId}`),
      Key: `${newName}.json`
    }).promise()
    if (response.error) {
      this.logger.error(`error copying configuration with id: ${configurationId}, with new name ${newName}, ${response.error.message}`)
    }
    return response
  }
}