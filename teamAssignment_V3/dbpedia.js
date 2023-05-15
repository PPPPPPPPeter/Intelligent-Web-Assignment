const axios = require('axios');

async function getBirdData(birdName) {
  const sparqlQuery = `
PREFIX dbo: <http://dbpedia.org/ontology/>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>

SELECT ?bird ?label ?scientificName ?description ?page 
WHERE {
    ?bird rdf:type dbo:Bird .
    ?bird rdfs:label ?label .
    ?bird dbo:abstract ?description .
    ?bird dbo:wikiPageID ?page .
    OPTIONAL { ?bird dbo:binomial ?scientificName . }
    FILTER (LANG(?label) = "en") .
    FILTER (LANG(?description) = "en") .
    FILTER(CONTAINS(lcase(str(?label)), "${birdName}"))
} 
LIMIT 1

    `;

  const url = 'https://dbpedia.org/sparql';
  const params = {
    defaultGraphURI: 'http://dbpedia.org',
    query: sparqlQuery,
    format: 'application/sparql-results+json',
  };

  try {
    const response = await axios.get(url, { params });

    const bindings = response.data.results.bindings;
    if (bindings.length > 0) {
      const binding = bindings[0];
      const uri = binding.bird.value;
      const scientificName = binding.label.value;
      const description = binding.description.value;

      return {
        uri,
        scientificName,
        description
      };
    } else {
      throw new Error(`No data found for bird: ${birdName}`);
    }
  } catch (error) {
    console.error(`Error fetching data from DBPedia: ${error}`);
    throw error;
  }
}

module.exports = {
  getBirdData
}