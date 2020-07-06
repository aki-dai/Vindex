import React from 'react'
import { TitleChangeEffect } from '../components/customHooks'
import { Grid, makeStyles, Theme, createStyles } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        body:{
            marginLeft: 30,
            marginRight: 30,
            fontSize: 17,
        }
    })
)

export const About: React.FC = () => {
    const classes = useStyles()
    return(
        <>
            <TitleChangeEffect title="このサイトについて - Vindex" />
            <h1>Vindexとは</h1>
            <Grid className={classes.body}>
                    Vindexは、YouTube上の動画にタグを付けて、検索できるようにできるサイトです。<br/>
                    誰でも動画を登録し、タグを編集することができます。<br/>
                    これによって、YouTubeのアルゴリズム上不利な動画に関して、目に触れる機会を増やすことが期待されます。<br/>
            </Grid>
            <h1>運営について</h1>
            <Grid className={classes.body}>
                    このサービスの開発、運用はあっきぃ(<a href="https://twitter.com/Ackey_coder">@Ackey_coder</a>)個人によって行われます。<br/>
                    あくまで個人の趣味の範疇で行われるため、全ての要望に応えることはできません。<br/>
                    またお問い合わせへの対応が遅くなる場合があります。<br/>
                    予めご了承ください。<br/>
                    <br/>
                    また、運営が困難だと判断した場合は、予告せずサービスを終了することがございます。<br/>
                    皆様のご理解とご協力をお願いいたします。<br/>

            </Grid>
            <h1>登録された動画について</h1>
            <Grid className={classes.body}>
                一度登録された動画に関して、基本的に登録を解除することはできません。ご注意ください。<br/>
                万が一間違えて登録した場合は、以下のフォームより、Twitterのユーザー名、ユーザーID、削除したい動画のIDもしくはURLをお知らせください<br/>
                <br/>
                https://forms.gle/mw9vgUCMLguXhS7J6<br/>
            </Grid>
            <h1>禁止事項</h1>
            <Grid className={classes.body}>
                    サービスを持続的な運用のため、以下の事項を禁止事項とさせていただきます。
                    <ul>
                        <li>
                            1.著作権違反の動画の登録
                        </li>
                        <li>
                            2.その他、YouTubeの規約に違反する動画の登録
                        </li>
                        <li>
                            3.動画と無関係のタグの登録
                        </li>
                        <li>
                            4.サーバーに負荷をかける行為
                        </li>
                    </ul>
                    詳しくは、<a href="/useTerm">利用規約</a>、及び<a href="/privacyPolicy">プライバシーポリシー</a>をご参照ください。
                    本サービスの継続的な利用をもって、本利用規約及びプライバシーポリシーに同意したものとみなします。

            </Grid>

            
            <h1>お問い合わせ</h1>
            <Grid className={classes.body}>
                    このサービスに関するお問い合わせは、以下のメールアドレス宛にお願いいたします。<br/>
                    <br/>
                    vindexsearch.contact[at]gmail.com
            </Grid>
        </>
    )
}