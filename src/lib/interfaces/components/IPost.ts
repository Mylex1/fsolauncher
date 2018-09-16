// fsolauncher
// \src\lib\interfaces\IPost.ts

export default interface IPost {
   /**
    * Headline text.
    *
    * @type {string}
    * @memberof IBlogPost
    */
   headline: string;
   /**
    * The post body.
    *
    * @type {string}
    * @memberof IBlogPost
    */
   body: string;
   /**
    * The link to the article.
    *
    * @type {string}
    * @memberof IBlogPost
    */
   link: string;
   /**
    * The date when it was posted.
    *
    * @type {string}
    * @memberof IBlogPost
    */
   date: string;
}
