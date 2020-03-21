import React from "react";
import getFhirJSON from '../components/GetFhirJSON';
import PieChart from '../components/Graphs/PieChart';
import BarGraph from "../components/Graphs/BarGraph";
import HorizontalBarGraph from "../components/Graphs/HorizontalBarGraph";
import { ExportToCSV } from "../components/ExportToCSV";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import json2xml from "../components/ExportToXML";
import convert2xml from "../components/ExportToXML";

class Gender extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            genders: [],
            isLoading: false
        };
        this.export2xml = this.export2xml.bind(this);
    }

    getGender(){
        let res = getFhirJSON("Patient/");
        let processedResults = [];
        return res.then((e) => {
            if (e){
                for (var i = 0; i < e.length; i++){
                    let patients = e[i];
                    for (var j = 0; j < patients.entry.length; j++){
                        processedResults.push(patients.entry[j].resource.gender);
                    }
                }
                return processedResults
            }
            else{
                return []
            }
        });
    }

    componentDidMount(){
        this.setState({isLoading : true})
        let promise = this.getGender();
        promise.then((e) => {
            this.setState({gender : e, isLoading: false});
        });
        
    }

    occurrence = (array) => {
        var result = {};

        if (array instanceof Array){
            array.forEach(function (x, i){
                if (!result[x]){
                    result[x] = [i];
                }
                else{
                    result[x].push(i);
                }
            });
        }
        return result;
    }

    pushIntoArray(props){
        this.state.genders.push(props);
    }

    export2xml = (text, fileName) => {
        return convert2xml(text, fileName);
    }
    
    render(){
        if (this.state.isLoading){
            return <Spinner animation="border" variant="success" />
        }

        if (!this.state.gender){
            return null
        }
        if (this.state.gender.length > 0){
            let male = this.occurrence(this.state.gender)["male"].length;
            let female = this.occurrence(this.state.gender)["female"].length;
            this.pushIntoArray(male);
            this.pushIntoArray(female);
            var gendersJson = JSON.stringify({...this.state.genders});
            return <React.Fragment><div><PieChart patientGender={this.state.genders}
                             labels={["Male", "Female"]}
                             title={"Patients' Gender Composition"}/></div>
                             <div class="btn-group">
                            <ExportToCSV array={[this.state.genders]} fileName={"GenderComposition.csv"}/>
                            <Button onClick={() => this.export2xml(gendersJson, 'GenderComposition.xml')} variant="outline-secondary">Export to XML</Button>
                        </div>
                    </React.Fragment>
                             
        }else{
            return <p><span>No data found</span></p>
        }
    }
}

export function PatientsGender(){
    return <div><Gender/></div>
}

class MaritalStatus extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            mStatus: [],
            isLoading: false
        };
        this.export2xml = this.export2xml.bind(this);
    }

    getStatus(){
        let res = getFhirJSON("Patient/");
        let processedResults = [];
        return res.then((e) => {
            if (e){
                for (var i = 0; i < e.length; i++){
                    let patients = e[i];
                    for (var j = 0; j < patients.entry.length; j++){
                        if (patients.entry[j].resource.maritalStatus !== undefined){
                            processedResults.push(patients.entry[j].resource.maritalStatus.text);
                        }
                        else{
                            processedResults.push("N/A");
                        }
                    }
                }
                return processedResults
            }
            else{
                return []
            }
        });
    }

    componentDidMount(){
        this.setState({isLoading : true})
        let promise = this.getStatus();
        promise.then((e) => {
            this.setState({status : e, isLoading: false});
        });
        
    }

    occurrence = (array) => {
        var result = {};

        if (array instanceof Array){
            array.forEach(function (x, i){
                if (!result[x]){
                    result[x] = [i];
                }
                else{
                    result[x].push(i);
                }
            });
        }
        return result;
    }

    pushIntoArray(props){
        this.state.mStatus.push(props);
    }

    export2xml = (text, fileName) => {
        return convert2xml(text, fileName);
    }
    
    render(){
        if (this.state.isLoading){
            return <Spinner animation="border" variant="success" />
        }

        if (!this.state.status){
            return null
        }
        if (this.state.status.length > 0){
            let married = this.occurrence(this.state.status)["M"].length;
            let unmarried = this.occurrence(this.state.status)["Never Married"].length;
            let notAvailable = this.occurrence(this.state.status)["N/A"].length;
            this.pushIntoArray(married);
            this.pushIntoArray(unmarried);
            this.pushIntoArray(notAvailable);
            var mStatusJson = JSON.stringify({...this.state.mStatus});
            return <React.Fragment><div><BarGraph maritalStatus={this.state.mStatus}
                             labels={["Married", "Not Married", "Not Available"]}
                             title={"Marital Status"}/></div><br/><br/>
                        <div class="btn-group">
                            <ExportToCSV array={[this.state.mStatus]} fileName={"MaritalStatus.csv"}/>
                            <Button onClick={() => this.export2xml(mStatusJson, 'MaritalStatus.xml')} variant="outline-secondary">Export to XML</Button>
                        </div>
                    </React.Fragment>
                             
        }else{
            return <p><span>No data found</span></p>
        }
    }
}

export function PatientsStatus(){
    return <div><MaritalStatus/></div>
}

class Age extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            ages: [],
            isLoading: false
        };
        this.export2xml = this.export2xml.bind(this);
    }

    

    calculateAge(birthDate){
        const result = Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e+10);
        return result;
    }

    getAge(){
        let res = getFhirJSON("Patient/");
        let processedResults = [];
        return res.then((e) => {
            if (e){
                for (var i = 0; i < e.length; i++){
                    let patients = e[i];
                    for (var j = 0; j < patients.entry.length; j++){
                        if (patients.entry[j].resource.birthDate !== undefined){
                            processedResults.push(this.calculateAge(patients.entry[j].resource.birthDate));
                        }
                    }
                }
                const sortedProcessedResults = processedResults.sort((a, b) => a - b);
                return sortedProcessedResults;
            }
            else{
                return []
            }
        });
    }

    componentDidMount(){
        this.setState({isLoading : true});
        let promise = this.getAge();
        promise.then((e) => {
            this.setState({age : e, isLoading : false});
        });
        
    }

    averageAge(array){
        let sum = array.reduce((a,b) => a + b, 0);
        let average = sum/(array.length);
        return average;
    }

    pushIntoArray(props){
        this.state.ages.push(props);
    }

    export2xml = (text, fileName) => {
        return convert2xml(text, fileName);
    }
    
    render(){
        if (this.state.isLoading){
            return <Spinner animation="border" variant="success" />
        }

        if (!this.state.age){
            return null
        }
        if (this.state.age.length > 0){
            let minor = [];
            let youngAdults = [];
            let adults = [];
            let olderAdults = [];
            let seniors = [];
            let legends = [];
            for (var i = 0; i < this.state.age.length; i++){
                if ((this.state.age[i] > -1) && (this.state.age[i] <= 17)){
                    minor.push(this.state.age[i]);
                }
                else if ((this.state.age[i] > 17) && (this.state.age[i] <= 35)){
                    youngAdults.push(this.state.age[i]);
                }
                else if ((this.state.age[i] > 35) && (this.state.age[i] <= 53)){
                    adults.push(this.state.age[i]);
                }
                else if ((this.state.age[i] > 53) && (this.state.age[i] <= 71)){
                    olderAdults.push(this.state.age[i]);
                }
                else if ((this.state.age[i] > 71) && (this.state.age[i] <= 90)){
                    seniors.push(this.state.age[i]);
                }
                else if (this.state.age[i] > 90){
                    legends.push(this.state.age[i]);
                }
            }
            let minorCount = minor.length;
            let youngAdultsCount = youngAdults.length;
            let adultsCount = adults.length;
            let olderAdultsCount = olderAdults.length;
            let seniorsCount = seniors.length;
            let legendsCount = legends.length;
            this.pushIntoArray(minorCount);
            this.pushIntoArray(youngAdultsCount);
            this.pushIntoArray(adultsCount);
            this.pushIntoArray(olderAdultsCount);
            this.pushIntoArray(seniorsCount);
            this.pushIntoArray(legendsCount);
            var agesJSON = JSON.stringify({...this.state.ages});
            

            return <React.Fragment><div><p style={{fontSize: 22}}><strong>Average Age : {Math.round(this.averageAge(this.state.age))} Years Old</strong></p></div>
                        <div><HorizontalBarGraph ageDistribution={this.state.ages}
                             labels={["Under 18","18-35","36-53","54-71","72-90","Over 90"]}
                             title={"Patients' Age Distribution"}/></div><br/><br/>
                        <div class="btn-group">
                        <ExportToCSV array={[this.state.ages]} fileName={"AgeDistribution.csv"}/>
                        <Button onClick={() => this.export2xml(agesJSON, 'AgeDistribution.xml')} variant="outline-secondary">Export to XML</Button></div>
                    </React.Fragment>
                             
        }else{
            return <p><span>No data found</span></p>
        }
    }
}

export function PatientsAge(){
    return <div><Age/></div>
}