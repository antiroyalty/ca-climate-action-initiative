export const storageLoadProfile = {
    single_family_detatched: {
        unknown: { // no load
            summer: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            winter: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        },
        very_cold: {
            summer: [0.0, 0.0, 1.378906117991552, 1.4093413228446627, 1.3705275657642098, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -1.378906117991552, -1.4093413228446627, -1.3705275657642098, 0.0, 0.0, 0.0, 0.0],
            winter: [0.0, 0.0, 2.992836814856153, 3.1544084046378984, 3.2719679036458356, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -2.992836814856153, -3.1544084046378984, -3.2719679036458356, 0.0, 0.0, 0.0, 0.0]
        },
        mixed_humid: {
            summer: [0.0, 0.0, 2.748170666738126, 2.645047662510474, 2.4771728846836996, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -2.748170666738126, -2.645047662510474, -2.4771728846836996, 0.0, 0.0, 0.0, 0.0],
            winter: [0.0, 0.0, 2.8614362852764055, 3.1198118479708494, 3.289621011763377, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -2.8614362852764055, -3.1198118479708494, -3.289621011763377, 0.0, 0.0, 0.0, 0.0]
        },
        mixed_dry: {
            summer: [0.0, 0.0, 2.0788593007838685, 2.1746365321852146, 2.1557573214441836, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -2.0788593007838685, -2.1746365321852146, -2.1557573214441836, 0.0, 0.0, 0.0, 0.0],
            winter: [0.0, 0.0, 1.5683045167118337, 1.7261965560072265, 1.9954411359530273, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -1.5683045167118337, -1.7261965560072265, -1.9954411359530273, 0.0, 0.0, 0.0, 0.0]
        },
        marine: { // NEW - PLUG LOADS
            // summer: [0.2852035038898411, 0.2596067621055185, 0.24951789668036592, 0.25000046632595824, 0.25005632497232383, 0.25051422673298873, 0.2505076716307003, 0.24971125324153418, 0.24800637880832876, 0.25088386019320325, 0.2633858468176096, 0.26752847810921887, 0.2681419147419663, 0.26793573421695144, 0.27024201558969396, 0.2728615353118696, 0.2722972088685339, 0.2699425528123629, 0.2776921035471102, 0.28829025189184265, 0.3095870778423134, 0.32019382857402845, 0.31069949841525046, 0.2978023858449219],
            // winter: [0.36162026853660106, 0.32841304538169613, 0.287275519352223, 0.26531948965102414, 0.25744730816230976, 0.254234741113814, 0.2531053969994252, 0.25297934487576285, 0.2546326960633158, 0.2627823955109392, 0.2832816360403985, 0.3013713534945159, 0.30729703197389985, 0.30847762702573034, 0.309031502799953, 0.3112621619975404, 0.31220651602882565, 0.3100993497866254, 0.3143614613431395, 0.3300253337673162, 0.35575225842555463, 0.38351981095084187, 0.390509080336375, 0.3792599854196884]
            summer: [0.0, 0.0, 1.2745938827197323, 1.4703106266283281, 1.6146605427583796, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -1.2745938827197323, -1.4703106266283281, -1.6146605427583796, 0.0, 0.0, 0.0, 0.0],
            winter: [0.0, 0.0, 1.7327397976924304, 1.7728630380380395, 1.9642911009693924, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -1.7327397976924304, -1.7728630380380395, -1.9642911009693924, 0.0, 0.0, 0.0, 0.0]
        },
        hot_humid: {
            summer: [0.0, 0.0, 3.243087085614252, 3.1156088754508384, 2.908849804264048, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -3.243087085614252, -3.1156088754508384, -2.908849804264048, 0.0, 0.0, 0.0, 0.0],
            winter: [0.0, 0.0, 1.8659013815756071, 2.0541477087554356, 2.2067036097048938, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -1.8659013815756071, -2.0541477087554356, -2.2067036097048938, 0.0, 0.0, 0.0, 0.0]
        },
        hot_dry: {
            summer: [0.0, 0.0, 2.263078405686822, 2.4686419809300992, 2.573349952291681, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -2.263078405686822, -2.4686419809300992, -2.573349952291681, 0.0, 0.0, 0.0, 0.0],
            winter: [0.0, 0.0, 1.0339920865869814, 1.1221322194775472, 1.2758507119568336, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -1.0339920865869814, -1.1221322194775472, -1.2758507119568336, 0.0, 0.0, 0.0, 0.0],
        },
        cold: {
            summer: [0.0, 0.0, 1.831541417071783, 1.8159736674509448, 1.7509810841759252, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -1.831541417071783, -1.8159736674509448, -1.7509810841759252, 0.0, 0.0, 0.0, 0.0],
            winter: [0.0, 0.0, 2.940043580131694, 3.100111075938785, 3.202253660694742, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -2.940043580131694, -3.100111075938785, -3.202253660694742, 0.0, 0.0, 0.0, 0.0]
        }
    }
};
export type ClimateZone = keyof typeof storageLoadProfile;

  