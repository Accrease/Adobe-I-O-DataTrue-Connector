/*
 * <license header>
 */

/**
 * This is a sample action showcasing how to create a cloud event and publish to I/O Events
 *
 * Note:
 * You might want to disable authentication and authorization checks against Adobe Identity Management System for a generic action. In that case:
 *   - Remove the require-adobe-auth annotation for this action in the manifest.yml of your application
 *   - Remove the Authorization header from the array passed in checkMissingRequestInputs
 *   - The two steps above imply that every client knowing the URL to this deployed action will be able to invoke it without any authentication and authorization checks against Adobe Identity Management System
 *   - Make sure to validate these changes against your security requirements before deploying the action
 */
const { Core } = require('@adobe/aio-sdk')
const fetch = require('node-fetch')
const { errorResponse, stringParameters } = require('../utils')

// main function that will be executed by Adobe I/O Runtime
async function main(params) {
  // create a Logger
  const logger = Core.Logger('main', { level: params.LOG_LEVEL || 'info' })

  try {
    // log parameters, only if params.LOG_LEVEL === 'debug'
    logger.debug(stringParameters(params))
    
    if (params.data.attributes.display_name !== params.ENVIRONMENT) {
      return {
        statusCode: 200,
      }
    }

    const { Tests: {test_class, test_id}} = params
    const fetchBody = {
      test_run: {
        test_class,
        test_id
      },
    }

    fetch('https://datatrue.com/ci_api/test_runs', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Token ${params.DATATRUE_API_KEY}`,
      },
      body: JSON.stringify(fetchBody),
    })
      .then((response) => response.json())
      .then((data) => logger.info(`Test triggered: ${stringParameters(data)}`))
      .catch((err) => {
        logger.info('Test run trigger failed')
        throw err
      })

    let statusCode = 200
    const response = {
      statusCode: statusCode,
    }

    // log the response status code
    logger.info(`${response.statusCode}: successful request`)
    return response
  } catch (error) {
    // log any server errors
    logger.error(error)
    // return with 500
    return errorResponse(500, 'server error', logger)
  }
}

exports.main = main
