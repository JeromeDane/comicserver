const AdmZip = require('adm-zip'),
      parseXmlStr = require('xml2js').parseString,
      path = require('path')

const parseXml = ({ comic, library, libraryPath, resolve }) => {
  if(!comic.path.match(/\.(cbz|zip|7z)$/)) resolve({ comic, library })
  else {
    try {
      const zip = new AdmZip(path.join(libraryPath, comic.path)),
            xmlStr = zip.readAsText('ComicInfo.xml')
      if(!xmlStr) resolve({ comic, library }) // TODO: add/log no ComicInfo.xml warning ?
      else {
        parseXmlStr(xmlStr, (err, xml) => {
          if(err || !xml.ComicInfo) resolve({ comic, library }) // TODO: add/log XML errors ?
          else {
            parseXmlFields(comic, xml.ComicInfo)
            resolve({ comic, library })
          }
        })
      }
    }
    catch(e) {
      resolve({ comic, library })
    }
  }
}

const parseXmlFields = (comic, xml) => {
  const splitCommaDel = val => typeof val === 'string' ? val.replace(/\s*,\s*/g, ',').split(',') : val,
        xmlFields = {   // key/parser pairs for importing fields from ComicInfo.xml
          Title: null,
          Series: null,
          Number: parseInt,
          Volume: parseInt,
          Year: parseInt,
          Month: parseInt,
          AlternateSeries: null,
          Summary: null,
          Notes: null,
          Writer: splitCommaDel,
          Penciller: null,
          Inker: null,
          Colorist: null,
          Letterer: null,
          CoverArtist: null,
          Editor: null,
          Publisher: null,
          Web: null,
          PageCount: parseInt,
          Characters: splitCommaDel,
          Teams: splitCommaDel,
          Locations: splitCommaDel
        },
        rename = {
          writer: 'writers',
          coverArtist: 'coverArtists',
          penciller: 'pencillers',
          inker: 'inkers',
          colorist: 'colorists',
          letterer: 'letterers',
          editor: 'editors'
        }
  Object.keys(xmlFields).forEach(field => {
    if(xml[field]) {
      comic[field.charAt(0).toLowerCase() + field.slice(1)] =
        typeof xmlFields[field] === 'function'
          ? xmlFields[field](xml[field][0])
          : xml[field][0]
    }
  })
  Object.keys(rename).forEach(field => {
    if(comic[field]) {
      comic[rename[field]] = comic[field]
      delete comic[field]
    }
  })
}

const save = ({ comic, library, resolve }) => {
  library.update(
    { path: comic.path },
    comic,
    { upsert: true, returnUpdatedDocs: true },
    (err, num, comic) => {
      if(err) throw new Error(err)
      resolve(comic)
    }
  )
}

module.exports = ({ comic, library, libraryPath, resolve }) => {
  parseXml({ comic, library, libraryPath, resolve: () =>
    save({ comic, library, resolve })
  })
}
