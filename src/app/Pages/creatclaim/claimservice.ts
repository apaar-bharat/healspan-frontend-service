import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable ,  throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/service/api.service';
const httpOptions= {
  headers: new HttpHeaders({
 'Content-Type':'application/json',
//  'Access-Control-Allow-Origin': '*',
  // 'Authorization': `Bearer ${localStorage.getItem("jwttoken")}`
  // 'Authorization': 'Bearer ' + localStorage.getItem("token")
 })
};
@Injectable({
  providedIn: 'root'
})



export class claimService {

  LoggedInId:any;
  constructor(private http: HttpClient,private api:ApiService) {
    this.LoggedInId = localStorage.getItem("LoggedInId");

   }

  savePatientInfo(claimStageId:any,claimInfoID:any,claimStageLinkId:any,patientInfoId:any,ClaimForm:any,otherCostDetail:any)
  {
    let patientbody = {
        "id": claimInfoID,
        "claimStageLinkId": claimStageLinkId,
        "userId" : this.LoggedInId,
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
            "genderId" : ClaimForm.value.Gender,
            "patientAndOtherCostLink" : otherCostDetail
        }
    }
    return this.http.post<any>(environment.baseUrl+"healspan/claim/createorupdateclaimandpatientinfo",patientbody,httpOptions)

  }


  saveMedicalInfo(claimStageId:any,claimStageLinkId:any,medicalInfoId:any,medicalForm:any,medicalAndChronicIllnessLink:any){

    let medicalParam = {
        "id":medicalInfoId,
        "claimStageLinkId":claimStageLinkId,
        "dateOfFirstDiagnosis" : medicalForm.value.Dateoffirstdiagnosis,
        "claimStageId" : claimStageId,
        "doctorName" : medicalForm.value.Nameofthetreatingdoctor,
        "doctorQualification" :medicalForm.value.Qualificationofthetreatingdoctor,
        "doctorRegistrationNumber": medicalForm.value.DrResgistrationnumber,
        "medicalAndChronicIllnessLink" : medicalAndChronicIllnessLink,
        "diagnosisId" : parseInt(medicalForm.value.Provisionaldiagnosis),
        "procedureId" : parseInt(medicalForm.value.Procedures),
        "specialityId" : parseInt(medicalForm.value.Speciality),
        "treatmentTypeId" : parseInt(medicalForm.value.TreatmentType)
      }

      return this.http.post<any>(environment.baseUrl+"healspan/claim/createorupdatemedicalinfo",medicalParam,httpOptions)


  }


  saveInsuranceInfo(claimStageId:any,claimStageLinkId:any,insuranceInfoId:any,InsuaranceForm:any){

    let insuranceParam = {
        "id": insuranceInfoId,
        "claimStageLinkId": claimStageLinkId,
        "claimStageId" : claimStageId,
        "tpaNumber" : InsuaranceForm.value.TPAnumber,
        "policyHolderName" : InsuaranceForm.value.PolicyHolder,
        "policyNumber" : InsuaranceForm.value.PolicyNumber,
        "isGroupPolicy" : InsuaranceForm.value.IsGroupPolicy,
        "groupCompany" : InsuaranceForm.value.Groupcompany,
        "claimIDPreAuthNumber" : null,
        "initialApprovalAmount" : null,
        "approvedEnhancementsAmount" : null,
        "approvedAmountAtDischarge" : null,
        "tpaId" : InsuaranceForm.value.TPAID,
        "insuranceCompanyId" : InsuaranceForm.value.InsuranceCompany,
        "relationshipId" : InsuaranceForm.value.RelationOPH
    }


      return this.http.post<any>(environment.baseUrl+"healspan/claim/createorupdateinsuranceinfo",insuranceParam,httpOptions)


  }


  saveSequentialQue(claimStageLinkId:any,questionlist:any,doclist:any){

    let ruleEngineParam = {
        "claimStageLinkId": claimStageLinkId,
        "sequentialQuestion": questionlist,
        "documentList": doclist
      }
    return this.http.post<any>(environment.baseUrl+"healspan/claim/savequestionnairesanddocument",ruleEngineParam,httpOptions)


  }


  UpdateClaimStage(Param:any){
    
    //const headers = new HttpHeaders{ responseType: 'text' };

    return this.http.post<any>(environment.baseUrl+"healspan/claim/updateclaimstatus",Param)

  }



}

