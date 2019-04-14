import { TestBed, async } from '@angular/core/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing'

import { GitApiService } from './git-api.service'
import { HttpClient } from '@angular/common/http'
import { of } from 'rxjs'
import { MatSnackBar } from '@angular/material'

describe('GitApiService', () => {
    beforeEach(() =>
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: Notification,
                    useClass: class NotificationStub {
                        notify() {}
                    },
                },
                { provide: MatSnackBar, useClass: class MatSnackBarStub {} },
            ],
            imports: [HttpClientTestingModule],
        })
    )

    it('should be created', () => {
        const service: GitApiService = TestBed.get(GitApiService)
        expect(service).toBeTruthy()
    })

    // not much to test here besides authentication, TS takes care of our edgecases
    describe('setAuthentication()', () => {
        it('should set the authToken property to base64 encoded version of the `username:password` template', () => {
            const service: GitApiService = TestBed.get(GitApiService)
            service.setAuthentication('username', 'password')
            expect(service.authToken).toEqual('dXNlcm5hbWU6cGFzc3dvcmQ=')
        })
    })

    describe('authToken', () => {
        it('should be dXNlcm5hbWU6cGFzc3dvcmQ= after calling setAuthentication', () => {
            const service: GitApiService = TestBed.get(GitApiService)
            service.setAuthentication('username', 'password')
            expect(service.authToken).toEqual('dXNlcm5hbWU6cGFzc3dvcmQ=')
        })
        it('should be undefined initially', () => {
            const service: GitApiService = TestBed.get(GitApiService)
            expect(service.authToken).toBeUndefined()
        })
    })

    describe('get()', () => {
        let httpClientSpy

        beforeEach(() => {
            httpClientSpy = { get: jasmine.createSpy('get').and.returnValue(of({})) }
            TestBed.configureTestingModule({
                providers: [{ provide: HttpClient, useValue: httpClientSpy }],
            })
        })

        it('should pass in the Authorization header, if the autToken is set', async(() => {
            const service: GitApiService = TestBed.get(GitApiService)

            service.setAuthentication('username', 'password')

            service
                .getRepos('random') // random get api call, since get() is private
                .subscribe(() => {
                    const params = httpClientSpy.get.calls.argsFor(0)
                    expect(params[1].headers.Authorization).toEqual('Basic dXNlcm5hbWU6cGFzc3dvcmQ=')
                })
        }))

        it('should not pass in the Authorization header, if the autToken is not set', async(() => {
            const service: GitApiService = TestBed.get(GitApiService)

            service
                .getRepos('random') // random get api call, since get() is private
                .subscribe(() => {
                    const params = httpClientSpy.get.calls.argsFor(0)
                    expect(params[1].headers.Authorization).toBeUndefined()
                })
        }))
    })

    describe('checkAuthentication()', () => {
        it('should throw Observable error if auth token is not set', async(() => {
            const service: GitApiService = TestBed.get(GitApiService)
            const nextSpy = jasmine.createSpy('next')
            const errorSpy = jasmine.createSpy('error')
            service.checkAuthentication().subscribe({
                next: nextSpy,
                error: errorSpy,
                complete: () => {
                    expect(nextSpy).toHaveBeenCalled()
                    expect(errorSpy).not.toHaveBeenCalled()
                },
            })
        }))
    })
})
