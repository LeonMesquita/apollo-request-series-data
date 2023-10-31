
import {  searchInstances, searchSeriesMetadata } from '../controllers/seriesController.js';
import { Router} from 'express';

const seriesRouter = Router();
seriesRouter.post('/search-instances', searchInstances);
seriesRouter.post('/search-metadata', searchSeriesMetadata);
export default seriesRouter;