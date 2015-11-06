// relode.js

var relode = (function(jsonld) {

  var my = {}, 
      promises = jsonld.promises;

  var documentClasses = function(doc, context, target) {

    var classes = document.createDocumentFragment();

    var classesSection = document.createElement('section');
    var classesHeader = document.createElement('h2');
    classesHeader.textContent = 'Classes';
    classesSection.appendChild(classesHeader);

    var frame = {
      "@context": context,
      "@type": [ "rdfs:Class", "owl:Class" ],
      "subClassOf": { "@embed": false },
      "rdfs:isDefinedBy": { "@embed": false },
    }; 

    var promise = promises.frame(doc, frame);

    promise.then(function(framed) {

      framed['@graph'].forEach(function(resource) {
        var classSection = assembleClassSection(resource);
        classesSection.appendChild(classSection);
      });

      classes.appendChild(classesSection);
      target.appendChild(classes);

    }, function(err) {
      throw new Exception("Had trouble framing classes", err);
    });

    var assembleClassSection = function(resource) {

      var classSection = assembleCommon(resource, context);

      if (hasRelationships(resource)) {
        var relationships = document.createElement('dl');
        relationships.className = 'relationships';

        var superClasses = resource['subClassOf'];
        if (superClasses.length > 0) {
          var dt = document.createElement('dt');
          dt.textContent = "has super-classes";
          relationships.appendChild(dt);

          superClasses.forEach(function(superClass){
            var dd = document.createElement('dd'),
                superClassId = decomposeCurie(superClass, context);
            dd.innerHTML = '<a title="Go to ' + superClassId.expanded + '" href="' + superClassId.expanded + '" class="class">' + superClass + '</a>';
            relationships.appendChild(dd);
          });
        }

        classSection.appendChild(relationships);
      }

      return classSection;
    };

    var supportedRelationships = ['subClassOf'];

    var hasRelationships = function(resource) {
      return supportedRelationships.some(function(relationship) {
        return resource[relationship].length > 0;
      });
    };
  };

  var documentProperties = function(doc, context, target) {

    var properties = document.createDocumentFragment();

    var propertiesSection = document.createElement('section');
    var propertiesHeader = document.createElement('h2');
    propertiesHeader.textContent = 'Object Properties';
    propertiesSection.appendChild(propertiesHeader);

    var frame = {
      "@context": context,
      "@type": [ "owl:ObjectProperty" ],
      "subPropertyOf": { "@embed": false },
      "rdfs:isDefinedBy": { "@embed": false },
      "domain": { "@embed": false },
      "range": { "@embed": false },
    }; 

    var promise = promises.frame(doc, frame);

    promise.then(function(framed) {

      framed['@graph'].forEach(function(resource) {
        var propertySection = assemblePropertySection(resource);
        propertiesSection.appendChild(propertySection);
      });

      properties.appendChild(propertiesSection);
      target.appendChild(properties);

    }, function(err) {
      throw new Exception("Had trouble framing properties", err);
    });

    var assemblePropertySection = function(resource) {

      var propertySection = assembleCommon(resource, context);

      if (hasRelationships(resource)) {
        var relationships = document.createElement('dl');
        relationships.className = 'relationships';

        var superProperties = resource['subPropertyOf'];
        if (superProperties.length > 0) {
          var dt = document.createElement('dt');
          dt.textContent = "has super-properties";
          relationships.appendChild(dt);

          superProperties.forEach(function(superProperty){
            var dd = document.createElement('dd'),
                superPropertyId = decomposeCurie(superProperty, context);
            dd.innerHTML = '<a title="Go to ' + superPropertyId.expanded + '" href="' + superPropertyId.expanded + '" class="superproperty">' + superProperty + '</a>';
            relationships.appendChild(dd);
          });
        }

        var domain = resource['domain'];
        if (domain) {
          var dt = document.createElement('dt');
          dt.textContent = 'has domain';
          relationships.appendChild(dt);

          var dd = document.createElement('dd'),
              domainId = decomposeCurie(domain, context);
          dd.innerHTML = '<a title="Go to ' + domainId.expanded + '" href="' + domainId.expanded + '" class="domain">' + domain + '</a>';
          relationships.appendChild(dd);
        }

        var range = resource['range'];
        if (range) {
          var dt = document.createElement('dt');
          dt.textContent = 'has range';
          relationships.appendChild(dt);

          var dd = document.createElement('dd'),
              rangeId = decomposeCurie(range, context);
          dd.innerHTML = '<a title="Go to ' + rangeId.expanded + '" href="' + rangeId.expanded + '" class="range">' + range + '</a>';
          relationships.appendChild(dd);
        }

        propertySection.appendChild(relationships);
      }

      return propertySection;
    };

    var supportedRelationships = ['subPropertyOf', 'domain', 'range'];

    var hasRelationships = function(resource) {
      return supportedRelationships.some(function(relationship) {
        return Array.isArray(resource[relationship]) ? resource[relationship].length > 0 : !!resource[relationship];
      });
    };
  };

  var assembleCommon = function(resource, context) {

    var id = decomposeCurie(resource['@id'], context);

    var section = document.createElement('div');
    section.id = id.name;
    section.className = 'resource ' + getTypeClassification(resource);
    section.setAttribute('resource', '[' + id.curie + ']');
    section.setAttribute('typeof', getAttribute(resource['@type']));

    var sectionHeader = document.createElement('h2');
    sectionHeader.innerHTML = '<span property="rdfs:label">' + resource['label']['en'] + '</span>';
    section.appendChild(sectionHeader);

    var iri = document.createElement('dl');
    iri.className = 'iri inline';
    iri.innerHTML = '<dt>IRI:</dt><dd><code>' + id.expanded + '</code></dd>';
    section.appendChild(iri);

    var definedBy = document.createElement('dl');
    definedBy.className = 'defined-by inline invisible';
    definedBy.innerHTML = '<dt>Is defined by:</dt><dd property="rdfs:isDefinedBy" resource="' + resource['rdfs:isDefinedBy'] + '"><code>' + resource['rdfs:isDefinedBy'] + '</code></dd>';
    section.appendChild(definedBy);

    var comment = resource['comment'];
    if (comment) {
      var commentElement = document.createElement('div');
      commentElement.className = "comment";
      commentElement.innerHTML = '<p property="rdfs:comment">' + comment['en'] + '</p>';
      section.appendChild(commentElement);
    }

    var moreInfo = resource['moreInfo'];
    if (moreInfo) {
      var moreInfoElement = document.createElement('dl');
      moreInfoElement.className = 'more-info inline';
      moreInfoElement.innerHTML = '<dt>For more info:</dt><dd><a property="vs:moreinfo" href="' + resource['moreInfo'] + '">' + resource['moreInfo'] + '</a></dd>';
      section.appendChild(moreInfoElement);
    }

    return section;
  };

  var getTypeClassification = function(resource) {
    var classTypes = ['rdfs:Class', 'owl:Class'],
        objectPropertyTypes = ['owl:ObjectProperty'],
        datatypePropertyTypes = ['owl:DatatypeProperty'],
        type = (typeof resource === 'string') ? resource : resource['@type'];

    if (Array.isArray(type)) {
      return type.map(getTypeClassification).join(' ');
    }
    
    if (classTypes.indexOf(type) > -1) return 'class';
    else if (objectPropertyTypes.indexOf(type) > -1) return 'object-property';
    else if (datatypePropertyTypes.indexOf(type) > -1) return 'data-property';
    else if (type === 'owl:FunctionalProperty') return 'functional';
  };

  var getAttribute = function(attribute) {
    return Array.isArray(attribute) ? attribute.join(' ') : attribute;
  };

  var decomposeCurie = function(curie, context) {
    //TODO Check to make sure its a curie
    var parts = curie.split(":"),
    prefix = parts[0],
    name = parts[1];

    return {
      "curie": curie,
      "prefix": prefix,
      "name": name,
      "expanded": context[prefix] + name
    };
  };

  var isRelativeUri = function(uri) {
    return (uri.indexOf('http:') !== 0 && uri.indexOf('https:') !== 0);
  };

  my.init = function(vocabUrl, targetId, options) {

    if (!vocabUrl) {
      throw new Error("A vocabUrl parameter is needed. This should resolve to a valid JSON-LD representation of the ontology that you wish to relode.");
    }
    if (!targetId) {
      throw new Error("A targetId parameter is needed. This id the id of the element to which the ontology description shall be appended.");
    }

    options = options || {};

    if (!('base' in options)) {
      options.base = document.location.protocol + "//" + document.location.host + document.location.pathname;
    }
    if (!('documentLoader' in options)) {
      options.documentLoader = jsonld.documentLoaders.xhr();
    }

    var documentLoader = options.documentLoader || jsonld.documentLoaders.xhr(),
        vocabUrl = isRelativeUri(vocabUrl) ? options.base + vocabUrl : vocabUrl,
        target = document.getElementById(targetId);

    documentLoader(vocabUrl).then(function(response) {
      var doc = JSON.parse(response.document);

      documentClasses(doc, doc['@context'], target);
      documentProperties(doc, doc['@context'], target);

    }, function(err) {
      console.warn("There was a problem: ", err);
    });

  };

  return my;

}(jsonld));
