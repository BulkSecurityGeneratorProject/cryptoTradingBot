/* tslint:disable max-line-length */
import { TestBed, async } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { ConnectionBackend, RequestOptions, BaseRequestOptions, Http, Response, ResponseOptions } from '@angular/http';
import { JhiDateUtils } from 'ng-jhipster';

import { TradeInfoMySuffixService } from '../../../../../../main/webapp/app/entities/trade-info-my-suffix/trade-info-my-suffix.service';
import { TradeInfoMySuffix } from '../../../../../../main/webapp/app/entities/trade-info-my-suffix/trade-info-my-suffix.model';

describe('Service Tests', () => {

    describe('TradeInfoMySuffix Service', () => {
        let service: TradeInfoMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                providers: [
                    {
                        provide: ConnectionBackend,
                        useClass: MockBackend
                    },
                    {
                        provide: RequestOptions,
                        useClass: BaseRequestOptions
                    },
                    Http,
                    JhiDateUtils,
                    TradeInfoMySuffixService
                ]
            });

            service = TestBed.get(TradeInfoMySuffixService);

            this.backend = TestBed.get(ConnectionBackend) as MockBackend;
            this.backend.connections.subscribe((connection: any) => {
                this.lastConnection = connection;
            });
        }));

        describe('Service methods', () => {
            it('should call correct URL', () => {
                service.find('123').subscribe(() => {});

                expect(this.lastConnection).toBeDefined();
                expect(this.lastConnection.request.url).toEqual('api/trade-infos/' + '123');
            });
            it('should return TradeInfoMySuffix', () => {

                let entity: TradeInfoMySuffix;
                service.find('123').subscribe((_entity: TradeInfoMySuffix) => {
                    entity = _entity;
                });

                this.lastConnection.mockRespond(new Response(new ResponseOptions({
                    body: JSON.stringify({id: '123'}),
                })));

                expect(entity).toBeDefined();
                expect(entity.id).toEqual('123');
            });

            it('should propagate not found response', () => {

                let error: any;
                service.find('123').subscribe(null, (_error: any) => {
                    error = _error;
                });

                this.lastConnection.mockError(new Response(new ResponseOptions({
                    status: 404,
                })));

                expect(error).toBeDefined();
                expect(error.status).toEqual(404);
            });
        });
    });

});
