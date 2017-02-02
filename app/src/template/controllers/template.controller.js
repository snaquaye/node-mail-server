let fs = require('fs');
let templateService = require('../services/template.service');

module.exports = app => {
  app.get('/templates', (req, res, next) => {
    let perPage = req.params['limit'] || 10;
    let page = req.params['page'] || 1;
    let filters = req.params['filters'] || {};
    let orderBy = req.params['orderBy'];
    let fields = req.params['fields'] || '';

    templateService.count(filters).subscribe(count => {
      templateService.getTemplates(perPage, page, orderBy, filters, fields).subscribe(templates => {
        res.send({
          count: count,
          data: templates
        });
      }, error => next(error));
    }, error => next(error));
  });

  app.post('/templates', (req, res, next) => {
    let template = req.body;

    let onNext = () => {
      res.status(201);
      res.send({
        success: true,
        message: 'Template created successfully'
      });
    };

    let error = (err) => {
      next(err);
    };

    templateService.createTemplate(template).subscribe(onNext, error);
  });

  app.get('/templates/:id', (req, res, next) => {
    let filters = {
      id: req.params['id']
    };

    let onNext = template => {
      res.send({
        success: true,
        data: template
      });
    };

    let onError = err => {
      next(err);
    };

    templateService.getTemplate(filters).subscribe(onNext, onError);
  });

  app.put('/template/:id', (req, res, next) => {
    let template = req.body;

    let onNext = () => {
      res.send({
        success: true,
        message: 'Template updated successfully.'
      });
    };

    let onError = (err) => {
      next(err);
    };

    templateService.updateTemplate(template).subscribe(onNext, onError);
  });

  app.delete('/template/:id', (res, req, next) => {
    let templateId = req.params['id'];

    let onNext = () => {
      res.send({
        success: true,
        message: 'Template successfully deleted.'
      });
    };

    let onError = err => {
      next(err);
    };

    templateService.removeTemplate(templateId).subscribe(onNext, onError);
  });
};