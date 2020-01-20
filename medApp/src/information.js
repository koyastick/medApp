{/* 引用 */ }
<ScrollView style={{ flex: 1 }}>
    <View style={styles.cmt}>
        <Text>
            NT-proBNP calculator cannot and will not be held legally, financially, or medically
            responsible for calculated NT-proBNP values and decisions made based on the NT-proBNP values obtained using this auto-calculation tool.
          </Text>
    </View>
    {/* 機関情報 */}
    <View style={{ flexDirection: "row" }}>
        <Image source={require('./src/fig/med_logo1_25.png')} style={{ width: 60, height: 60 }} />
        <View style={styles.container}>
            <Text style={{ margin: 5 }}>
                Kasahara S, Shimokawa H et al. Int J Cardiol. 2019;280:184-189.
             </Text>
            <Text style={{ margin: 5 }}>
                Department of Cardiovascular Medicine, Tohoku University Graduate School of Medicine
            </Text>
        </View>
    </View>
</ScrollView>