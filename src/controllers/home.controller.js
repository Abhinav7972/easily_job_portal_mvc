import * as JobModel from '../model/Job.js';

export default class HomeController {
  static Homepage(_req, res) {
    res.render('Home', { featuredJobs: JobModel.getAllJobs().slice(0, 3) });
  }
}
