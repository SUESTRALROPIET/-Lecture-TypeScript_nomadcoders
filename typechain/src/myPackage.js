// @ts-check    // TS에게 JS파일 체크하라고 시키는 것(w. JS DOC)
/**             // JS DOC
 * Initializes the project
 * @param {object} config 
 * @param {boolean} config.debug
 * @param {string} config.url
 * @returns boolean
 */

export function init(config){
  return true;
}

/**
 * Exits the program
 * @param {number} code 
 * @returns {number}
 */
export function exit(code){
  return code + 1;
}