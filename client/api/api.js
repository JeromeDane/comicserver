
module.exports = function(path, resolve) {
  var xhttp = new XMLHttpRequest()
  xhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
      resolve(JSON.parse(this.responseText))
    }
  }
  xhttp.open('GET', '/api/' + path, true)
  xhttp.send()
}
