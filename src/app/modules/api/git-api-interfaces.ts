// some rudimentary interfaces, so at least we can pretend we work with types.

export interface GitUserInfo {
    login: string
    id: number
    node_id: string
    avatar_url: string
    gravatar_id: string
    url: string
    html_url: string
    followers_url: string
    following_url: string
    gists_url: string
    starred_url: string
    subscriptions_url: string
    organizations_url: string
    repos_url: string
    events_url: string
    received_events_url: string
    type: string
    site_admin: boolean
}

export interface GitRepoInfo {
    id: number
    node_id: string
    name: string
    full_name: string
    private: boolean
    owner: GitUserInfo
    html_url: string
    description: string | null
    fork: boolean
    url: string
    homepage: string | null
    size: number
    stargazers_count: number
    watchers_count: number
    language: string
    forks_count: number
    archived: boolean
    disabled: boolean
    open_issues_count: number
    forks: number
    open_issues: number
    watchers: number
    score: number
    [anyOtherProperty: string]: any // we don't care about the rest
}

export interface GitIssueInfo {
    url: string
    id: number
    node_id: string
    number: number
    title: string
    user: GitUserInfo
    state: string
    comments: number
    created_at: string
    updated_at: string
    closed_at: string
    body: string
    score: number
    [anyOtherProperty: string]: any // we don't care about the rest
}

export interface GitList<ItemType> {
    total_count: number
    incomplete_results: boolean
    items: Array<ItemType>
}

export interface GitRepoList extends GitList<GitRepoInfo> {}

export interface GitIssueList extends GitList<GitIssueInfo> {}
