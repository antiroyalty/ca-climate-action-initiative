export const stoveLoadProfile = {
    single_family_detatched: {
        unknown: { // no load
            summer: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            winter: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        },
        very_cold: {
            summer: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -2.9011856758832572e-06, -7.161758352534565e-05, -0.00022652649769585258, -0.0003680335541474654, -0.00047419534850230434, -0.00054236571140553, -0.0005631720430107529, -0.0005438568068356376, -0.0005065104166666668, -0.000437509000576037, -0.0003359104982718895, -0.0002318788402457757, -0.00011774253552227351, -4.3043754800307225e-05, -1.5558995775729654e-05, -5.730366743471585e-07, 0.0, 0.0],
            winter: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -1.063368055555556e-06, -5.4563492063492084e-05, -0.00020868675595238104, -0.00026025545634920645, -0.0003336402529761905, -0.0003551277281746033, -0.0003317150297619048, -0.00027531622023809534, -0.00018679315476190486, -9.3226066468254e-05, -1.940104166666667e-05, -9.269593253968257e-07, 0.0, 0.0, 0.0, 0.0]
        },
        mixed_humid: {
            summer: [0.0, 0.0, 0.0, 0.0, -0.00011332073875000574, -0.0013385585925449492, -0.004372394412485751, -0.008637400987102297, -0.013197360760277718, -0.017136247173764666, -0.01984147072217027, -0.021272062287286418, -0.021192295684813116, -0.01985634438241575, -0.017137803680324953, -0.01349468740250709, -0.009098342359741888, -0.004692333115505189, -0.0014719513355238056, -0.00013931104207591042, -5.266231380954934e-06, 0.0, 0.0, 0.0],
            winter: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -4.2903389622482876e-05, -0.0014103554470083525, -0.005559094036322725, -0.009561321055339836, -0.012613106735443141, -0.014260195722745124, -0.01425887108669913, -0.012909618699843264, -0.010134067040276097, -0.006263638380214629, -0.00231808819571822, -0.0003234580162212712, -2.138312091188628e-05, -1.6349639058071479e-07, 0.0, 0.0, 0.0, 0.0]
        },
        mixed_dry: {
            summer: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -3.941559576886095e-05, -0.0020576026459189316, -0.013739567852667778, -0.039541954424920596, -0.06977482734504768, -0.09768741804353531, -0.11878653072821063, -0.1314177339219629, -0.13474483492146755, -0.13028364950316174, -0.11848889398840227, -0.10064719745315734, -0.07738284232304692, -0.05034012661363173, -0.02417286257539996, -0.00510511918291226, -0.00018978203222892444, 0.0],
            winter: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.00011331300813008133, -0.00407335140018067, -0.021212707015959047, -0.04606163429689854, -0.06690662827461608, -0.08064864498644986, -0.0864199676302319, -0.08215364724480581, -0.07152041930141526, -0.05363109379704908, -0.031018936314363144, -0.007871205962059622, -0.00039241192411924137, 0.0, 0.0, 0.0]
        },
        marine: {
            summer: [1.0672376438407856, 0.8172091949759612, 0.6821820290154337, 0.6138987289496632, 0.5827853439177724, 0.5809810413129602, 0.6192432636371521, 0.7074481408403316, 0.8442064787622947, 0.9170793883866898, 0.9415043572859797, 0.9503589805850003, 0.9540541802413626, 0.9776091481974344, 1.0344624242238847, 1.0687953241866657, 1.1476474001590735, 1.3018566754360479, 1.5145812295742282, 1.6724328524194838, 1.6757169631431108, 1.5889213814833518, 1.471573855901743, 1.347967982201218],
            winter: [2.296815365365366, 2.1297856995153066, 1.9396555443601504, 1.8444810995205747, 1.7970064281386668, 1.8661809467362107, 1.942882696512302, 2.117217092092095, 2.33875231152205, 2.6004301933512473, 2.76023419472104, 2.737543775354304, 2.614332381065277, 2.4213410640904085, 2.2259121746746766, 2.085833685000792, 1.8650362559928353, 1.756502975343766, 1.804392204704706, 2.0148340821084263, 2.235276022733261, 2.364606432089988, 2.4048928994784275, 2.3734449245297946]
        },
        hot_humid: {
            summer: [0.0, 0.0, 0.0, 0.0, 0.0, -0.00010708066600653699, -0.001246139942787537, -0.004443288094597008, -0.008955060925467053, -0.013557818979150933, -0.017406034999259967, -0.019810697489231033, -0.02074616206241596, -0.02027140365336159, -0.01849505348671795, -0.01558424565422125, -0.01170040556293181, -0.00736963756033061, -0.003483521240942107, -0.0009713136637951212, -5.6470227981457436e-05, 0.0, 0.0, 0.0],
            winter: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -2.596662321024445e-06, -0.0005984673615931769, -0.003434118935148346, -0.007876615177390626, -0.01170738439368886, -0.014429937524338427, -0.015856779672176798, -0.015836770153150985, -0.014223359614122032, -0.011275403476890032, -0.007299533642983865, -0.003182647530791042, -0.0006236382243442506, -1.1223796812066975e-05, 0.0, 0.0, 0.0, 0.0]
        },
        hot_dry: {
            summer: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -3.6053422813071837e-06, -0.0013071467329358478, -0.01815843541221364, -0.06090951705868056, -0.11776115220341243, -0.17414894074098086, -0.21823316833171508, -0.24761502259030668, -0.2597460752644392, -0.2554870119237241, -0.23509405500890698, -0.2002618222214829, -0.1517055571949668, -0.09568041670424669, -0.04404550110083782, -0.007512076232907689, -0.00021033955657675808, 0.0],
            winter: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -1.8226456864856396e-05, -0.0033635823749589067, -0.03241912224665289, -0.07897721587327447, -0.11982036670074897, -0.14898361247590886, -0.16275336433912135, -0.16062980929027518, -0.1422720567876436, -0.10926403358759293, -0.06766565264469121, -0.019797922189949687, -0.001137863858048989, 0.0, 0.0, 0.0],
        },
        cold: {
            summer: [0.0, 0.0, 0.0, -3.341068848232309e-08, -0.00020535239229486582, -0.0016799977105168766, -0.004556070480250373, -0.008709207519966584, -0.013991623232771465, -0.01943583553413903, -0.023919156434755, -0.026852304065569894, -0.027991920166906197, -0.027439539373197215, -0.02506910933732869, -0.021311631434065302, -0.016348542183278112, -0.011071976565581731, -0.006379322295086703, -0.0031496270363948592, -0.0012404957787879056, -0.00020358520872095753, -7.912152640805799e-06, 0.0],
            winter: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -5.3825819421766925e-05, -0.0012430792968503984, -0.004684435151555483, -0.008344935190430069, -0.012335785304647401, -0.01531357724389928, -0.016608674874767936, -0.01613413091125826, -0.013890731454022245, -0.010297759062417727, -0.006244202403563063, -0.0034320764793649328, -0.001423066634826472, -0.00021790917404358878, -7.0290893339108115e-06, 0.0, 0.0, 0.0]
        }
    }
};
export type ClimateZone = keyof typeof stoveLoadProfile;

  