// Adapt the Gauge Chart from https://plot.ly/javascript/gauge-charts/ Links to an external site. to plot the weekly washing frequency of the individual.
// You will need to modify the example gauge code to account for values ranging from 0 through 9.
// Update the chart whenever a new sample is selected.//

function buildGuage(sample) {
    console.log('startingGuage');
    // Get Data
    d3.json(samples).then(function (data) {
        console.log(data);

        // Get the washing frequency for the selected sample
        let metaData = data.metadata;
        let metaDataArray = metaData.filter(sampleObject => sampleObject.id == sample);
        let metaDataResults = metaDataArray[0];
        let washingFrequency = metaDataResults.wfreq;

        // Define the ranges for the gauge chart based on the washing frequency
        let maxRange = Math.max(washingFrequency, 9);
        let ranges = d3.range(0, maxRange + 1);

    
        var data = [
            {
                domain: { x: [0, 1], y: [0, 1] },
                value: washingFrequency,
                title: { text: "Belly Button Washing Frequency Scrubs Per Week" },
                type: "indicator",
                mode: "gauge+number",
                gauge: {
                    axis: {
                        range: [null, maxRange],
                        tickvals: ranges,
                        ticktext: ranges.map(String)
                    },
                    bar: { color: "darkblue" },
                    steps: [
                        { range: [0, 1], color: "rgba(255, 255, 255, 0)" },
                        { range: [1, 2], color: "rgba(232, 226, 202, .5)" },
                        { range: [2, 3], color: "rgba(210, 206, 145, .5)" },
                        { range: [3, 4], color: "rgba(202, 209, 95, .5)" },
                        { range: [4, 5], color: "rgba(170, 202, 42, .5)" },
                        { range: [5, 6], color: "rgba(110, 154, 22, .5)" },
                        { range: [6, 7], color: "rgba(14, 127, 0, .5)" },
                        { range: [7, 8], color: "rgba(10, 120, 22, .5)" },
                        { range: [9, maxRange], color: "rgba(14, 127, 0, .7)" }
                    ],
                    // Define the shape of the gauge needle
                    shape: [
                        {
                            type: 'line',
                            x0: 0.5,
                            y0: 0.5,
                            x1: 0.6,
                            y1: 0.8,
                            line: {
                                color: 'black',
                                width: 3
                            }
                        }
                    ],
                    // Set the threshold for the gauge
                    threshold: {
                        line: {
                            color: 'red',
                            width: 4
                        },
                        thickness: 0.75,
                        value: washingFrequency
                    }
                }
            }
        ];
        
        var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
        Plotly.newPlot('gauge', data, layout);
    });
}
