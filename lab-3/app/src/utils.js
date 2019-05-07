function formDataToJSON(formData) {
  var object = {};

  formData.forEach(function(value, key) {
    object[key] = value;
  });

  return JSON.stringify(object);
}

module.exports = {
  formDataToJSON: formDataToJSON
};
