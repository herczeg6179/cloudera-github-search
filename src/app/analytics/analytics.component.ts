import * as d3 from 'd3'

import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core'
import { GitRepoInfo } from '../api/git-api-interfaces'
import { BarChartData } from './bar-chart/bar-chart.component'

const getColorRange = length => d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), length).reverse()

@Component({
    selector: 'app-analytics',
    templateUrl: './analytics.component.html',
    styleUrls: ['./analytics.component.scss'],
})
export class AnalyticsComponent implements OnChanges {
    @Input() repos: Array<GitRepoInfo> = []
    @Output() removeFromComparing = new EventEmitter<GitRepoInfo['id']>()

    public legend: Array<{ name: string; id: number; color: string }> = []

    public starGazerChartData: Array<BarChartData> = []
    public forkChartData: Array<BarChartData> = []
    public openIssuesChartData: Array<BarChartData> = []

    private color

    constructor() {
        this.color = d3
            .scaleOrdinal<string, string>()
            .domain([])
            .range(getColorRange(1))
            .unknown('#ccc')
    }

    ngOnChanges() {
        this.color.domain(this.repos.map(({ name }) => name))
        this.color.range(getColorRange(this.repos.length))

        this.starGazerChartData = this.getStarGazerData()
        this.forkChartData = this.getForksData()
        this.openIssuesChartData = this.getOpenIssuesData()
        this.legend = this.getLegendData()
    }

    public removeRepo(repoId: GitRepoInfo['id']) {
        this.removeFromComparing.emit(repoId)
    }

    private getLegendData(): Array<{ name: string; id: number; color: string }> {
        return this.repos.map(({ name, id }) => ({
            name,
            id,
            color: this.color(name),
        }))
    }

    private getStarGazerData(): Array<BarChartData> {
        return [
            ...this.repos.map(({ id, name, stargazers_count }) => ({
                id,
                name,
                value: stargazers_count,
                color: this.color(name),
            })),
        ]
    }

    private getForksData(): Array<BarChartData> {
        return [
            ...this.repos.map(({ id, name, forks_count }) => ({
                id,
                name,
                value: forks_count,
                color: this.color(name),
            })),
        ]
    }

    private getOpenIssuesData(): Array<BarChartData> {
        return [
            ...this.repos.map(({ id, name, open_issues_count }) => ({
                id,
                name,
                value: open_issues_count,
                color: this.color(name),
            })),
        ]
    }
}
