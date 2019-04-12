import * as d3 from 'd3'

import { Component, Input, AfterContentInit, ViewChild, ElementRef, OnChanges } from '@angular/core'
import { Selection } from 'd3'

export interface BarChartData {
    name: string
    value: number
    id: number
    color: string
}

@Component({
    selector: 'app-bar-chart',
    templateUrl: './bar-chart.component.html',
    styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent implements AfterContentInit, OnChanges {
    @ViewChild('chartContainer') openIssuesChartElement: ElementRef
    @Input() data: Array<BarChartData> = []

    private d3Container: Selection<Element, BarChartData, null, null>
    private transition = d3
        .transition()
        .duration(400)
        .ease(d3.easeLinear)
    private beforePositionData = []

    private margin = { top: 20, right: 0, bottom: 30, left: 40 }
    private width = 400
    private height = 300

    constructor() {}

    ngAfterContentInit() {
        this.initBarChart()
    }

    ngOnChanges() {
        if (this.d3Container) {
            this.updateChart()
        }
    }

    private initBarChart() {
        this.d3Container = d3.select(this.openIssuesChartElement.nativeElement)

        const svg = this.d3Container
            .append('svg')
            .attr('width', this.width + this.margin.left + this.margin.right)
            .attr('height', this.height + this.margin.top + this.margin.bottom)
            .append('g')
            .attr('class', 'bar-pane')
            .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')')

        svg.append('g')
            .attr('class', 'x axis')
            .call(this.getXAxisRenderer())

        svg.append('g')
            .attr('class', 'y axis')
            .call(this.getYAxisRenderer())
    }

    private getXAxisRenderer() {
        return x => g =>
            g
                .attr('transform', `translate(0, ${this.height - this.margin.bottom})`)
                .call(d3.axisBottom(x).tickSizeOuter(0))
    }

    private getYAxisRenderer() {
        return y => g => g.attr('transform', `translate(${this.margin.left},0)`).call(d3.axisLeft(y))
    }

    private getXScale() {
        return d3
            .scaleBand()
            .domain(this.data.map(({ name }) => name))
            .range([this.margin.left, this.width - this.margin.right])
            .padding(0.1)
    }

    private getYScale() {
        return d3
            .scaleLinear()
            .domain([0, d3.max(this.data, ({ value }) => value)])
            .nice()
            .range([this.height - this.margin.bottom, this.margin.top])
    }

    private getBeforePositionData(id: number, defaultPosition) {
        return (
            this.beforePositionData.find(element => element.id === id) || {
                ...defaultPosition,
                y: this.height - this.margin.bottom,
                height: 0,
            }
        )
    }

    private updateChart() {
        const xScale = this.getXScale()
        const yScale = this.getYScale()

        const afterPositionData = this.data.map(({ id, name, value, color }) => ({
            id,
            x: xScale(name),
            y: yScale(value),
            width: xScale.bandwidth(),
            height: yScale(0) - yScale(value),
            color,
        }))

        const $bars = this.d3Container
            .select('.bar-pane')
            .selectAll('rect.bar')
            .data(this.data)
            .join('rect')
            .attr('class', 'bar')
        const $xAxis = this.d3Container.select('.bar-pane').select('.x.axis')
        const $yAxis = this.d3Container.select('.bar-pane').select('.y.axis')

        if (!!this.beforePositionData) {
            $bars
                .attr('x', (d, i) => this.getBeforePositionData(d.id, afterPositionData[i]).x)
                .attr('width', (d, i) => this.getBeforePositionData(d.id, afterPositionData[i]).width)
                .attr('y', (d, i) => this.getBeforePositionData(d.id, afterPositionData[i]).y)
                .attr('height', (d, i) => this.getBeforePositionData(d.id, afterPositionData[i]).height)
                .attr('fill', (d, i) => this.getBeforePositionData(d.id, afterPositionData[i]).color)
        }

        this.selectionWithTransition($bars)
            .attr('fill', (d, i) => afterPositionData[i].color)
            .attr('x', (d, i) => afterPositionData[i].x)
            .attr('width', (d, i) => afterPositionData[i].width)
            .attr('y', (d, i) => afterPositionData[i].y)
            .attr('height', (d, i) => afterPositionData[i].height)

        this.selectionWithTransition($xAxis).call(this.getXAxisRenderer()(xScale))
        this.selectionWithTransition($yAxis).call(this.getYAxisRenderer()(yScale))

        this.beforePositionData = [...afterPositionData]
    }

    private selectionWithTransition($selection) {
        // this is pretty bad but it makes TSC shut up for now. In theory .transition() should have the same Selection signature,
        // but for some reason the interface is missing the .call method, making TSC confused
        return (!!this.beforePositionData ? $selection.transition(this.transition) : $selection) as Selection<
            Element,
            BarChartData,
            null,
            null
        >
    }
}
