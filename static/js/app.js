let samples = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

console.log("hello")

d3.json(samples).then(function(data) {
    console.log(data);
 })


// 2.Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
function buildBarChart(sample) {
  console.log('startingBarChart')
  // Get Data
  d3.json(samples).then(function(data){
    console.log(data);

// Use sample_values as the values for the bar chart.
    let sampleValues = data.samples;
    let sampleArray = sampleValues.filter(sampleObject => sampleObject.id == sample );
    let results = sampleArray[0];
    let otu_ids = results.otu_ids;
    let yTicks = otu_ids.slice(0,10).map(otuID => `OTU ${otuID}`).reverse();
    let x = results.sample_values.slice(0,10).reverse();
    // Use otu_ids as the labels for the bar chart.
    let text = results.otu_labels.slice(0,10).reverse();
    console.log(results);



    // Build Bar Chart 
    let barData = [ {
      y: yTicks,
      x: x,
      // Use otu_labels as the hovertext for the chart.
      hoverText: text,
      type: "bar",
      orientation: "h",
    }]


    Plotly.newPlot("bar",barData)
  });
}
function init() {
  buildBarChart(940);
}

init();

//3.Create a bubble chart that displays each sample.
function buildBubbleChart(sample) {
console.log("starting bubble chart");

}
// Use otu_ids for the x values.
// Use sample_values for the y values.
// Use sample_values for the marker size.
// Use otu_ids for the marker colors.
// Use otu_labels for the text values.
// Display the sample metadata, i.e., an individual's demographic information.
// Display each key-value pair from the metadata JSON object somewhere on the page.
// Update all the plots when a new sample is selected. Additionally, you are welcome to create any layout that you would like for your dashboard. An example dashboard is shown as follows:
// Deploy your app to a free static page hosting service, such as GitHub Pages. Submit the links to your deployment and your GitHub repo. Ensure that your repository has regular commits and a thorough README.md file
