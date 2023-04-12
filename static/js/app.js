let samples = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

console.log("hello")

d3.json(samples).then(function (data) {
  console.log(data);
})

// 2.Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.

// Select the HTML element where the dropdown menu will be displayed
let dropdownMenu = d3.select('#selDataset');

// Use d3.json to fetch the data for the dropdown menu options
d3.json(samples).then(function (data) {
  let sampleNames = data.names;
  // Add each sample ID as an option to the dropdown menu
  sampleNames.forEach(function (sample) {
    dropdownMenu.append('option').text(sample).property('value', sample);
  });
});

// // Listen for a change event on the dropdown menu
// dropdownMenu.on('change', function () {
//   // Get the selected sample ID from the dropdown menu
//   let selectedSample = d3.select(this).property('value');
// Call the buildBarChart, buildBubbleChart, and showMetadata functions with the selected sample ID
function optionChanged(sample) {
  buildBarChart(sample);
  buildBubbleChart(sample);
  showMetadata(sample);
  buildGuage(sample);
}


// Build bar chart
function buildBarChart(sample) {
  console.log('startingBarChart')
  // Get Data
  d3.json(samples).then(function (data) {
    console.log(data);

    // Use sample_values as the values for the bar chart.
    let sampleValues = data.samples;
    let sampleArray = sampleValues.filter(sampleObject => sampleObject.id == sample);
    let results = sampleArray[0];
    let otu_ids = results.otu_ids;
    let yTicks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
    let x = results.sample_values.slice(0, 10).reverse();
    // Use otu_ids as the labels for the bar chart.
    let text = results.otu_labels.slice(0, 10).reverse();
    console.log(results);

    let barData = [{
      y: yTicks,
      x: x,
      // Use otu_labels as the hovertext for the chart.
      hoverText: text,
      type: "bar",
      orientation: "h",
    }]
    var layout = {
      title: `Top 10 OTUs for Sample ${sample}`,
      xaxis: { title: "Sample Values" },
      yaxis: { title: "OTU IDs" }
    };
    Plotly.newPlot("bar", barData, layout);

  });
}
function init() {
  buildBarChart(940);
  buildBubbleChart(940);
  showMetadata(940);
  buildGuage(940);
}
init();

// Create bubble chart
function buildBubbleChart(sample) {
  // Use d3.json to fetch the data for the selected sample
  d3.json(samples).then(function (data) {
    console.log(data);
    // Extract the required data from the JSON response
    let sampleValues = data.samples;
    let sampleArray = sampleValues.filter(sampleObject => sampleObject.id == sample);
    let results = sampleArray[0];
    let xValues = results.otu_ids;
    let yValues = results.sample_values;
    let markerSizes = results.sample_values;
    let markerColors = results.otu_ids;
    let textValues = results.otu_labels;

    // Define the trace for the bubble chart
    var trace = {
      x: xValues,
      y: yValues,
      mode: 'markers',
      marker: {
        size: markerSizes,
        color: markerColors,
        colorscale: 'Earth'
      },
      text: textValues
    };

    // Define the layout for the bubble chart
    var layout = {
      xaxis: { title: 'OTU IDs' },
      yaxis: { title: 'Sample Values' },
      title: `Bubble Chart for Sample ${sample}`
    };

    // Create the plot using Plotly
    Plotly.newPlot('bubble', [trace], layout);
  });
}

//Call this function with the ID of a selected sample to create a bubble chart for that sample.
function showMetadata(sample) {
  // Use d3.json to fetch the metadata for the selected sample
  d3.json(samples).then(function(data) {
    console.log(data)
    let metaData = data.metadata;
    // let sampleArray = sampleValues.filter(sampleObject => sampleObject.id == sample);
    let metaDataArray = metaData.filter(sampleObject => sampleObject.id == sample);
    console.log(metaDataArray)
    let metaDataResults = metaDataArray[0];
    console.log(metaDataResults)
    // Select the HTML element where the metadata will be displayed
    var metadataPanel = d3.select('#sample-metadata');
    // Clear any existing metadata
    metadataPanel.html('');
    // Loop through each key-value pair in the metadata and append it to the panel
    
    Object.entries(metaDataResults).forEach(function([key, value]) {
      metadataPanel.append('p').text(`${key.toUpperCase()}: ${value}`);
    });
  });
}
