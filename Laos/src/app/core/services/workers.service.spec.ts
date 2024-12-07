import { TestBed } from '@angular/core/testing';
import {  HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { WorkersService } from './workers.service';
import { environment } from '../../../environments/environment';

describe('WorkersService', () => {
  let service: WorkersService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [WorkersService, provideHttpClientTesting()]
    });

    service = TestBed.inject(WorkersService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should get address suggestions', () => {
    const mockResponse = {
      suggestions: [{
        id: '123',
        address: '123 Main St',
        city: 'Springfield',
        state: 'IL',
        zipCode: '62701'
      }]
    };

    service.getAddressSuggestions('123 Main').subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      `${environment.workerUrl}/address-suggestions?query=123%20Main`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should check health status', () => {
    const mockResponse = { status: 'ok' };

    service.checkHealth().subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.workerUrl}/api/health`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
it('should analyze case description', () => {
  const mockResponse = { analysis: 'positive' };
  const caseDescription = 'Sample case description';

  service.analyzeCaseDescription(caseDescription).subscribe(response => {
    expect(response).toEqual(mockResponse);
  });

  const req = httpMock.expectOne(`${environment.workerUrl}/api/analyze-case`);
  expect(req.request.method).toBe('POST');
  expect(req.request.body).toEqual({ caseDescription });
  req.flush(mockResponse);
});
