// Which page the server rendered (routes/web.php). "lp" is the ad landing page:
// the same showcase as "home", but without demo links or other outbound links.
export const page = window.FTS_PAGE ?? "home";
export const isLp = page === "lp";
