import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';

Font.register({
    family: 'NotoNaskhArabic',
    src: '/fonts/NotoNaskhArabic-Regular.ttf',
});

Font.register({
    family: 'Roboto',
    src: '/fonts/Roboto-Thin.ttf',
});

const styles = StyleSheet.create({
    page: {
        backgroundColor: '#f7fafc',
        padding: 8,
        color: '#000',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    container: {
        width: '50%',
        height: '50%',
        padding: 8,
        boxSizing: 'border-box',
    },
    document: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        border: '1px solid #000',
        padding: 8,
    },
    textCenter: {
        textAlign: 'center',
    },
    fontBold: {
        fontWeight: 'bold',
        fontSize: 8,
    },
    textLg: {
        fontSize: 6,
    },
    my4: {
        marginVertical: 4,
    },
    borderBlack: {
        borderBottom: '1px solid #000',
    },
    mt4: {
        marginTop: 4,
    },
    flex: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    flexCol: {
        display: 'flex',
        flexDirection: 'column',
    },
    borderBox: {
        border: '1px solid #000',
        height: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    w64: {
        width: 64,
    },
    w16: {
        width: 16,
    },
    mt2: {
        marginTop: 2,
    },
    h10: {
        height: 10,
    },
    arabicText: {
        fontFamily: 'NotoNaskhArabic',
        fontSize: 6,
    },
    flexRow: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    symbol: {
        fontSize: 60,
        marginRight: 4,
        fontFamily: 'Roboto',
        fontWeight: 100,
    },
    wFull: {
        width: '100%',
    },
});

export interface ClientPrintProps {
    lastName: string;
    firstName: string;
    birthDate?: string;
    nationality?: string;
    profession?: string;
    cin?: string;
    residenceCard?: string;
    passport?: string;
    entryNumber?: string;
    address?: string;
    arrivalDate?: string;
    roomNumber: string;
    childrenCount?: string;
    origin?: string;
    destination?: string;
    clientSignature?: string;
}

const ClientPrint: React.FC<ClientPrintProps> = ({
    lastName,
    firstName,
    birthDate,
    nationality,
    profession,
    cin,
    residenceCard,
    passport,
    entryNumber,
    address,
    arrivalDate,
    roomNumber,
    childrenCount,
    origin,
    destination,
    clientSignature,
}) => {
    const renderDocument = () => (
        <View style={styles.document}>
            <View style={[styles.textCenter, { display: 'flex', flexDirection: 'column', gap: 2 }]}>
                <Text style={[styles.fontBold, styles.textLg]}>Tanja Lucía Hostal</Text>
                <Text style={styles.textLg}>30 Rue Bouselham</Text>
                <Text style={styles.textLg}>Tél: 06 34 24 2120</Text>
                <Text style={styles.textLg}>TANGER</Text>
                <Text style={[styles.textCenter, styles.fontBold, styles.textLg]}>BULLETIN INDIVIDUEL D&apos;HOTEL</Text>
            </View>
            <View style={[styles.my4, styles.borderBlack, styles.mt4]} />
            <View style={[styles.mt4, { display: 'flex', flexDirection: 'column', gap: 3 }]}>
                <View style={styles.flex}>
                    <Text style={styles.textLg}>Nom: <Text style={styles.fontBold}>{lastName}</Text></Text>
                    <Text style={[styles.arabicText, { textAlign: 'right' }]}>الاسم العائلي</Text>
                </View>
                <View style={styles.flex}>
                    <Text style={styles.textLg}>Prénom: <Text style={styles.fontBold}>{firstName}</Text></Text>
                    <Text style={[styles.arabicText, { textAlign: 'right' }]}>الاسم الشخصي</Text>
                </View>
                <View style={styles.flex}>
                    <Text style={styles.textLg}>Date de Naissance: <Text style={styles.fontBold}>{birthDate}</Text></Text>
                    <Text style={[styles.arabicText, { textAlign: 'right' }]}>تاريخ الازدياد</Text>
                </View>
                <View style={styles.flex}>
                    <Text style={styles.textLg}>Nationalité: <Text style={styles.fontBold}>{nationality}</Text></Text>
                    <Text style={[styles.arabicText, { textAlign: 'right' }]}>الجنسية</Text>
                </View>
                <View style={styles.flex}>
                    <Text style={styles.textLg}>Profession: <Text style={styles.fontBold}>{profession}</Text></Text>
                    <Text style={[styles.arabicText, { textAlign: 'right' }]}>المهنة</Text>
                </View>
            </View>
            <View style={[styles.flexRow, styles.mt4]}>
                <Text style={[styles.textLg, { width: '5%', textAlign: 'center', fontSize: 10, marginTop: 10 }]}>N°</Text>
                <Text style={[styles.symbol, { width: '10%' }]}>{'{'}</Text>
                <View style={[styles.flexCol, { width: '90%' }]}>
                    <View style={styles.mt2}>
                        <Text style={styles.textLg}>C.I.N:</Text>
                        <View style={[styles.borderBox, styles.mt2]}>
                            <Text style={[styles.textLg, styles.fontBold]}>{cin}</Text>
                        </View>
                    </View>
                    <View style={styles.mt2}>
                        <Text style={styles.textLg}>Carte de Séjour:</Text>
                        <View style={[styles.borderBox, styles.mt2]}>
                            <Text style={[styles.textLg, styles.fontBold]}>{residenceCard}</Text>
                        </View>
                    </View>
                    <View style={styles.mt2}>
                        <Text style={styles.textLg}>Passeport:</Text>
                        <View style={[styles.borderBox, styles.mt2]}>
                            <Text style={[styles.textLg, styles.fontBold]}>{passport}</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{ marginTop: 8 }}>
                <Text style={styles.textLg}>N° D&apos;entrée au Maroc:</Text>
                <View style={[styles.borderBox, styles.mt2]}>
                    <Text style={[styles.textLg, styles.fontBold]}>{entryNumber}</Text>
                </View>
            </View>
            <View style={styles.mt2}>
                <Text style={styles.textLg}>Domicile Habituel:</Text>
                <View style={[styles.borderBox, styles.mt2]}>
                    <Text style={[styles.textLg, styles.fontBold]}>{address}</Text>
                </View>
            </View>
            <View style={[styles.my4, styles.borderBlack]} />
            <View style={[styles.flex, { gap: 6 }]}>
                <View style={[styles.mt2, { width: '50%' }]}>
                    <Text style={styles.textLg}>Date d&apos;arrivée:</Text>
                    <View style={[styles.borderBox, styles.mt2]}>
                        <Text style={[styles.textLg, styles.fontBold]}>{arrivalDate}</Text>
                    </View>
                </View>
                <View style={[styles.flexCol, { width: '50%' }]}>
                    <View style={styles.mt2}>
                        <Text style={styles.textLg}>N° de Chambre:</Text>
                        <View style={[styles.borderBox, styles.mt2]}>
                            <Text style={[styles.textLg, styles.fontBold]}>{roomNumber}</Text>
                        </View>
                    </View>
                    <View style={styles.mt2}>
                        <Text style={styles.textLg}>Nombre d&apos;enfants mineurs Accompagnant le client:</Text>
                        <View style={[styles.borderBox, styles.mt2]}>
                            <Text style={[styles.textLg, styles.fontBold]}>{childrenCount}</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={[styles.mt2, styles.flex, { gap: 6 }]}>
                <View style={[styles.mt2, { width: '50%' }]}>
                    <Text style={styles.textLg}>Lieu de Provenance:</Text>
                    <View style={[styles.borderBox, styles.mt2]}>
                        <Text style={[styles.textLg, styles.fontBold]}>{origin}</Text>
                    </View>
                </View>
                <View style={[styles.mt2, { width: '50%' }]}>
                    <Text style={styles.textLg}>Destination:</Text>
                    <View style={[styles.borderBox, styles.mt2]}>
                        <Text style={[styles.textLg, styles.fontBold]}>{destination}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.mt4}>
                <Text style={styles.textLg}>Signature de Client</Text>
                <View style={[styles.borderBox, styles.mt2]}>
                    <Text style={[styles.textLg, styles.fontBold]}>{clientSignature}</Text>
                </View>
            </View>
            <View style={[styles.textCenter, styles.mt4]}>
                <Text style={styles.textLg}>Fait à Tanger le: _____________</Text>
                <View style={[styles.my4, styles.borderBlack, styles.mt4]} />
                <Text style={[styles.textLg, styles.mt2]}>Carte d&apos;identité National Obligatoire pour les Marocains</Text>
            </View>
        </View>
    );

    return (
        <Document>
            <Page style={styles.page}>
                <View style={styles.container}>{renderDocument()}</View>
                {/*                 
                <View style={styles.container}>{renderDocument()}</View>
                <View style={styles.container}>{renderDocument()}</View>
                <View style={styles.container}>{renderDocument()}</View> */}
            </Page>
        </Document>
    );
};

export default ClientPrint;