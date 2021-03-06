import webpack from 'webpack';
import rimraf from 'rimraf';
import path from 'path';
import webpackOptions from './webpack.config';
import i18nextWebpackPlugin from '../index';

/**
 * Wait for webpack
 * @param {*} options
 */
const waitForWebpack = options =>
  new Promise((resolve, reject) => {
    webpack(options, () => resolve());
  });

describe('webpack', () => {
  it('Test webpack implementation (one entry)', async () => {
    await waitForWebpack(webpackOptions);

    const localeEnglish = require('./locales/en/translation.json');
    const localeGerman = require('./locales/de/translation.json');

    // clean up
    rimraf(webpackOptions.output.path.replace('dist', 'locales'), ok => {});
    rimraf(webpackOptions.output.path, ok => {});

    expect(localeEnglish).toEqual({
      'hi-iam-t': '',
      'hi-iam-$t': '',
      'hi-iam-i18next': '',
      'hi-iam-i18n': '',
      deep: {
        deeper: ''
      }
    });
    expect(localeGerman).toEqual({
      'hi-iam-t': '',
      'hi-iam-$t': '',
      'hi-iam-i18next': '',
      'hi-iam-i18n': '',
      deep: {
        deeper: ''
      }
    });
  });
});
