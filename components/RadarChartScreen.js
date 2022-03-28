import React, {processColor} from 'react';
import { StyleSheet, View } from 'react-native';
import { RadarChart } from 'react-native-charts-wrapper';

const RadarChartScreen = () => {
    const legend = {
        enabled: true,
        textSize: 14,
        form: 'CIRCLE',
        wordWrapEnabled: true,
    };

    const xAxis = {
        valueFormatter: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
        zeroLine: {
            enabled: true,
            lineWidth: 1.5,
        },
    };

    const data = {
        dataSets: [
            {
                values: [
                    { value: 90 },
                    { value: 110 },
                    { value: 125 },
                    { value: 115 },
                    { value: 110 },
                    { value: 130 },
                    { value: 107 },
                    { value: 126 },
                    { value: 104 },
                    { value: 109 },
                ],
                label: 'Some stat',
                config: {
                    color: processColor('#FF8C9D'),
                    drawFilled: true,
                    fillColor: processColor('#FF8C9D'),
                    fillAlpha: 100,
                    lineWidth: 2,
                },
            },
        ],
    };

    const [selectedEntry, setSelectedEntry] = React.useState('');

    const handleSelect = event => {
        let entry = event.nativeEvent;
        if (entry === null) {
            setSelectedEntry('');
        } else {
            setSelectedEntry(JSON.stringify(entry));
        }
        console.log(event.nativeEvent);
    };

    return (
        <ThemedContainer>
            <Header title="Radar Chart" />
            <ThemedBody>
                <ThemedCard>
                    <View style={styles.textView}>
                        <ThemedText> selected entry</ThemedText>
                        <ThemedText> {selectedEntry}</ThemedText>
                    </View>

                    <View>
                        <RadarChart
                            style={styles.chart}
                            data={data}
                            xAxis={xAxis}
                            yAxis={{ drawLabels: true }}
                            chartDescription={{ text: '' }}
                            legend={legend}
                            drawWeb={true}
                            webLineWidth={5}
                            webLineWidthInner={2}
                            webAlpha={255}
                            webColor={processColor('#007aba')}
                            webColorInner={processColor('silver')}
                            skipWebLineCount={1}
                            onSelect={e => handleSelect(e)}
                            onChange={event => console.log(event.nativeEvent)}
                        />
                    </View>
                </ThemedCard>
            </ThemedBody>
        </ThemedContainer>
    );
};


const styles = StyleSheet.create({
    chart: {
        width: 300,
        height: 500,
    },
    textView: { height: 80 },
});


export default RadarChartScreen;