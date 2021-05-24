import React, { useEffect, useState } from 'react'
import styles from './project.module.css';
import config from '../../config'

import APIService from '../../api.service'
import { withRouter } from 'react-router';

function Project(props) {

    const projectId = props.match.params.id;
    const [project,setProject] = useState('');
    const [curStage,setCurStage] = useState(1);

    const handleCurStage = (x) => {
        if(x<=project.seeker.stage+1)
        setCurStage(x);
    }

    useEffect(async() => {
        var res = await APIService.getProject(projectId);
        console.log(res);
        setProject(res.data);
    }, [] );
    console.log(project);

    return (
        <>
        <div className={styles.project_body}>
            {(project)? (<div><img src={`${config.BASE_URL}user/seeker/${project.project.image}`} className={styles.project_cover_img} alt="" />
            <div className={styles.project_content}>
            <p>Company Name: &nbsp; {project.project.name}</p>
            <p>Description: &nbsp; {project.project.description}</p>
            <p>Address: &nbsp; {project.project.address}</p>
            </div>
            </div>):(null)}
        </div>
        <div className={styles.project_details}>
            {(project)?(<><div className={styles.project_project_details}>
                <p><strong>Company details :-</strong></p>
                <p>Initial deposit: {project.project.deposit}</p>
                <p>Investor count: {project.project.investor_count}</p>
                <p>Coins recieved: {project.project.amount_received}</p>
                <p>Target to achieve: {project.project.totalRequiredTokens}</p>
                <p>Created on : {project.project.sanctionedData}</p>
            </div>
            <div className={styles.project_seeker_details}>
                <p><strong>Owner details :-</strong></p>
                <p>Name: {project.user.name}</p>
                <p>Email: {project.user.email}</p>
                <p>Files related to licensing:</p>
                <div style={{textAlign: "center"}}>
                    <button className={`${styles.seeker_stage_btn}`} > <a href={`${config.BASE_URL}user/seeker/${project.seeker.f1}`}>File 1</a> </button>
                    <button className={`${styles.seeker_stage_btn}`} > <a href={`${config.BASE_URL}user/seeker/${project.seeker.f2}`}>File 2</a> </button>
                    <button className={`${styles.seeker_stage_btn}`} > <a href={`${config.BASE_URL}user/seeker/${project.seeker.f3}`}>File 3</a> </button>
                    <button className={`${styles.seeker_stage_btn}`} > <a href={`${config.BASE_URL}user/seeker/${project.seeker.f4}`}>File 4</a> </button>
                    <button className={`${styles.seeker_stage_btn}`} > <a href={`${config.BASE_URL}user/seeker/${project.seeker.f5}`}>File 5</a> </button>
                </div>
            </div></>) : (null)}
        </div>
        </>
    )
}

export default withRouter(Project);
