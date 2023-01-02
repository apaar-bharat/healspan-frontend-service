import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable ,  throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/service/api.service';

@Injectable({
  providedIn: 'root'
})



export class claimService {

  constructor(private http: HttpClient,private api:ApiService) { }

  savePatientInfo(claimStageId:any,claimInfoID:any,claimStageLinkId:any,patientInfoId:any,ClaimForm:any,otherCostDetail:any)
  {
    let patientbody = {
        "id": claimInfoID,
        "claimStageLinkId": claimStageLinkId,
        "tpaClaimId" : null,
        "userId" : 1,
        "hospitalId" : ClaimForm.value.Hospital,
        "claimStageId" : claimStageId,
        "statusId" : 2,
        "patientInfoDto" : {
            "id": patientInfoId,
            "claimStageLinkId": claimStageLinkId,
            "firstName" : ClaimForm.value.Fname,
            "middleName" : ClaimForm.value.Mname,
            "lastname" : ClaimForm.value.Lname,
            "mobileNo" : ClaimForm.value.MobileNo,
            "dateBirth" : ClaimForm.value.DOB,
            "age" : ClaimForm.value.Age,
            "isPrimaryInsured": ClaimForm.value.patientprimaryInsured,
            "dateOfAdmission" : ClaimForm.value.DateOfAdmission,
            "estimatedDateOfDischarge" : ClaimForm.value.DateOfDischarge,
            "dateOfDischarge" : ClaimForm.value.DateOfDischarge,
            "costPerDay" : ClaimForm.value.CostPD,
            "totalRoomCost" : ClaimForm.value.totalRC,
            "otherCostsEstimate" : ClaimForm.value.OtherCE,
            "initialCostEstimate" : ClaimForm.value.InitialCE,
            "billNumber" : ClaimForm.value.BillNumber,
            "claimedAmount" : ClaimForm.value.ClaimedAmount,
            "enhancementEstimate" : ClaimForm.value.Enhancementestimate,
            "finalBillAmount" : ClaimForm.value.FinalbillAmount,
            "hospitalUhid" : ClaimForm.value.PHUHID,
            "hospitalId" : ClaimForm.value.Hospital,
            "roomCategoryId" : ClaimForm.value.RoomCategory,
            "procedureId" : ClaimForm.value.Procedure,
            "genderId" : ClaimForm.value.Gender,
            "patientAndOtherCostLink" : otherCostDetail
        }
    }
    return this.http.post<any>(environment.baseUrl+"healspan/claim/createorupdateclaimandpatientinfo",patientbody)

  }


  saveMedicalInfo(){

  }

}

