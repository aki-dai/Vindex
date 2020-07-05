import React from 'react'
import { TitleChangeEffect } from '../components/customHooks'
import { Accordion, AccordionSummary, Typography, AccordionDetails, makeStyles, createStyles} from '@material-ui/core/'
import { Theme } from '@material-ui/core/styles'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root:{
            margin: "0 auto",
            width:"80%"
        },
        content:{
            fontSize: 20
        }
    })
)

export const Update: React.FC = () => {
    const classes = useStyles()
    return(
        <>
            <TitleChangeEffect title="更新情報 - Vindex" />
                <div className = {classes.root}>
                    <Accordion>                        
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                            <Typography className={classes.content}>2020/7/6　公開</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Web開発初心者が個人開発を始めて半年、ようやく形になりました。<br/>
                                現在は検索機能、動画登録といった最低限の機能しかありませんが、新機能の実装が出来次第、
                                随時更新していきます。<br/>
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </div>
        </>
    )
}