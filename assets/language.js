(function () {
  'use strict';
  var STORAGE_KEY = 'karmaTejasviLanguage';
  var supported = ['hi', 'en'];

  function getSavedLanguage() {
    try {
      var value = localStorage.getItem(STORAGE_KEY);
      return supported.indexOf(value) !== -1 ? value : 'hi';
    } catch (error) { return 'hi'; }
  }

  function translateElement(element, language) {
    if (!element || element.nodeType !== 1) return;
    if (element.matches('[data-hi][data-en]')) {
      if (element.classList.contains('language-toggle')) {
        element.textContent = language === 'hi' ? 'English' : 'हिंदी';
      } else {
        element.textContent = element.getAttribute('data-' + language);
      }
    }
    ['alt', 'aria-label', 'title', 'placeholder'].forEach(function (attribute) {
      var value = element.getAttribute('data-' + attribute + '-' + language);
      if (value !== null) element.setAttribute(attribute, value);
    });
    if (element.tagName === 'TITLE') {
      var title = element.getAttribute('data-' + language);
      if (title) document.title = title;
    }
    Array.prototype.forEach.call(element.querySelectorAll('[data-hi][data-en]'), function (child) {
      if (child.classList.contains('language-toggle')) {
        child.textContent = language === 'hi' ? 'English' : 'हिंदी';
      } else {
        child.textContent = child.getAttribute('data-' + language);
      }
    });
    Array.prototype.forEach.call(element.querySelectorAll('[data-alt-hi],[data-aria-label-hi],[data-title-hi],[data-placeholder-hi]'), function (child) {
      ['alt', 'aria-label', 'title', 'placeholder'].forEach(function (attribute) {
        var value = child.getAttribute('data-' + attribute + '-' + language);
        if (value !== null) child.setAttribute(attribute, value);
      });
    });
  }

  function applyLanguage(language, persist) {
    if (supported.indexOf(language) === -1) language = 'hi';
    document.documentElement.lang = language;
    translateElement(document.body, language);
    var description = document.querySelector('meta[name="description"]');
    if (description) {
      var descriptionValue = description.getAttribute('data-content-' + language);
      if (descriptionValue) description.setAttribute('content', descriptionValue);
    }
    var title = document.querySelector('title');
    if (title) {
      var titleValue = title.getAttribute('data-' + language);
      if (titleValue) document.title = titleValue;
    }
    if (persist) {
      try { localStorage.setItem(STORAGE_KEY, language); } catch (error) {}
    }
    document.dispatchEvent(new CustomEvent('languagechange', { detail: { language: language } }));
  }

  document.addEventListener('click', function (event) {
    var button = event.target.closest('.language-toggle');
    if (!button) return;
    applyLanguage(document.documentElement.lang === 'hi' ? 'en' : 'hi', true);
  });

  document.addEventListener('DOMContentLoaded', function () {
    applyLanguage(getSavedLanguage(), false);
    // Translate components inserted after initial page load without rewriting existing DOM text.
    if (window.MutationObserver) {
      var observer = new MutationObserver(function (records) {
        var language = document.documentElement.lang || 'hi';
        records.forEach(function (record) {
          record.addedNodes.forEach(function (node) {
            if (node.nodeType === 1) translateElement(node, language);
          });
        });
      });
      observer.observe(document.body, { childList: true, subtree: true });
    }
  });
}());
