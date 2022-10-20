import React, { Component, useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

const Thumbnails = (props) => {
   const {medias} = props;
  return (
    <>
     <div className="col-md-6 col-12 pr product-images img_action_zoom pr_sticky_img kalles_product_thumnb_slide">
   <div className="row theiaStickySidebar">
      <div className="col-12 col-lg col_thumb">
         <div className="p-thumb p-thumb_ppr images sp-pr-gallery equal_nt nt_contain ratio_imgtrue position_8 nt_slider pr_carousel" data-flickity='{"initialIndex": ".media_id_001","fade":true,"draggable":">1","cellAlign": "center","wrapAround": true,"autoPlay": false,"prevNextButtons":true,"adaptiveHeight": true,"imagesLoaded": false, "lazyLoad": 0,"dragThreshold" : 6,"pageDots": false,"rightToLeft": false }'>
            {
               medias.map((x,i)=>{
                  return (
                     <div className="img_ptw p_ptw p-item sp-pr-gallery__img w__100 nt_bg_lz lazyload padding-top__127_66 media_id_001" 
                     data-mdid="001" 
                     data-height="1440" 
                     data-width="1128" 
                     data-ratio="0.7833333333333333" 
                     data-mdtype="image" 
                     data-src={"http://"+x.Url}
                     data-bgset={"http://"+x.Url}
                     data-cap="Blush Beanie - color pink , size L"></div>
                  )
               })
            }

         </div>
         <div className="p_group_btns pa flex">
            <button className="br__40 tc flex al_center fl_center show_btn_pr_gallery ttip_nt tooltip_top_left">
            <i className="las la-expand-arrows-alt"></i><span className="tt_txt">Click to enlarge</span>
            </button>
         </div>
      </div>
      <div className="col-12 col-lg-auto col_nav nav_medium t4_show">
         <div className="p-nav ratio_imgtrue row equal_nt nt_cover position_8 nt_slider pr_carousel" data-flickityjs='{"initialIndex": ".media_id_001","cellSelector": ".n-item:not(.is_varhide)","cellAlign": "left","asNavFor": ".p-thumb","wrapAround": true,"draggable": ">1","autoPlay": 0,"prevNextButtons": 0,"percentPosition": 1,"imagesLoaded": 0,"pageDots": 0,"groupCells": 3,"rightToLeft": false,"contain":  1,"freeScroll": 0}'></div>
         <button type="button" aria-label="Previous" className="btn_pnav_prev pe_none">
         <i className="las la-angle-up"></i>
         </button>
         <button type="button" aria-label="Next" className="btn_pnav_next pe_none">
         <i className="las la-angle-down"></i>
         </button>
      </div>
      <div className="dt_img_zoom pa t__0 r__0 dib"></div>
   </div>
</div>
    </>
  );
};

export default Thumbnails;
