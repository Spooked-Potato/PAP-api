class UpperName {
  /**
   * Colocar as primeiras letras de cada palavra do nome em letra maiúscula
   * @param {string} name 
   * @returns 
   */
  upperName(name) {
    return name.charAt(0).toUpperCase() + name.slice(1)
  }
}

module.exports = UpperName