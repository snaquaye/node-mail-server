let Rx = require('rxjs');
let Template = require('../models/template.model');
let HttpError = require('../../../exception/http_error');

/**
 * @description Template service class
 * 
 * @class TemplateService
 */
class TemplateService {
  /**
   * @description Returns number of templates base on passed filters
   * 
   * @param filters {Object} criteria in which to count template
   * @return {Observable<number>}
   * 
   * @memberof TemplateService
   */
  count(filters = {}) {
    let templateCount = Template.count(filters);

    return Rx.Observable.fromPromise(templateCount.exec());
  }

  /**
   * @description Returns all templates
   * 
   * @param perPage {number} The number of documents to get
   * @param page {number} The current page to get
   * @param sort {string} The criteria in which to sort the data
   * @param filters {object} The criteria used to select the data
   * @param fields {string} The list of fields to return to the caller
   * 
   * @return {Observable<Doc[]>}
   * 
   * @memberof TemplateService
   */
  getTemplates(perPage, page, sort, filters, fields) {
    let query = Template.find(filters)
      .limit(perPage)
      .skip(perPage * (page - 1))
      .sort(sort)
      .select(fields);

    return Rx.Observable.fromPromise(query.exec());
  }

  /**
   * @description Returns a template specified by its Id
   * 
   * @param filters {Object} The id of the template to get
   * @param fields {string} The fields to be collected
   * 
   * @return {Observable<{}>}
   */
  getTemplate(filters, fields = null) {
    //TODO: Make this method more general so filters can accept strings
    let query = Template;

    if (filters.id || filters._id) {
      let id = filters.id || filters._id;
      query.findById(id);
    } else {
      query.findOne(filters);
    }

    query.select(fields);

    return Rx.Observable.fromPromise(query.exec());
  }

  /**
   * @description Creates a new email template
   * 
   * @param doc {object} Document to save
   * 
   * @throws {Observable<HttpError>}
   * @return {Observable<Object>}
   */
  createTemplate(doc) {
    let template = new Template(doc);
    let error = template.validateSync();

    if (error) {
      let err = new HttpError(error.message);
      err.statusCode = 400;

      return Rx.Observable.throw(err);
    }

    let createPromise = template.save();

    return Rx.Observable.fromPromise(createPromise);
  }

  /**
   * Updates a template document
   * 
   * @param doc {Object} Document payload
   * 
   * @return {Observable<Object>}
   */
  updateTemplate(doc) {
    //TODO: replace with this.getTemplate when it has been modified to allow passing of string
    Template.findById(doc.id).exec((err, res) => {
      if (err) return Rx.Observable.throw(err);

      if (!doc) {
        let err = new HttpError('Template Not Found');
        err.statusCode = 404;

        return Rx.Observable.throw(err);
      }

      if (doc.version !== res.get('version')) {
        let err = new HttpError('Conflict');
        err.statusCode = 409;

        return Rx.Observable.throw(err);  
      }
    });

    let updatePromise = Template.findByIdAndUpdate(doc.id, doc);
    
    return Rx.Observable.fromPromise(updatePromise);
  }
  
  /**
   * Deletes a template
   * 
   * @param {string} templateId
   * @returns {Observable<T>}
   * 
   * @memberOf TemplateService
   */
  removeTemplate(templateId) {
    return Rx.Observable.fromPromise(Template.findByIdAndRemove(templateId));
  }
}

module.exports = new TemplateService;
