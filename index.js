var pkcs11js = require("pkcs11js");

var pkcs11 = new pkcs11js.PKCS11();
pkcs11.load("./lib/softhsm2-x64.dll");
// 
pkcs11.C_Initialize();

try {
    // Getting info about PKCS11 Module
    var module_info = pkcs11.C_GetInfo();
    console.log(module_info, 'module_info');

    // Getting list of slots
    var slots = pkcs11.C_GetSlotList(true);
    console.log(slots, 'slots');
    var slot = slots[0];

    // Getting info about slot
    var slot_info = pkcs11.C_GetSlotInfo(slot);
    console.log(slot_info, 'slot_info');
    // Getting info about token
    var token_info = pkcs11.C_GetTokenInfo(slot);
    console.log(token_info, 'token_info');

    // Getting info about Mechanism
    var mechs = pkcs11.C_GetMechanismList(slot);
    console.log(mechs, 'mechs');
    var mech_info = pkcs11.C_GetMechanismInfo(slot, mechs[0]);
    console.log(mech_info, 'mech_info');

    var session = pkcs11.C_OpenSession(slot, pkcs11js.CKF_RW_SESSION | pkcs11js.CKF_SERIAL_SESSION);
    console.log(session, 'session');

    // Getting info about Session
    var info = pkcs11.C_GetSessionInfo(session);
    pkcs11.C_Login(session, 1, "password");

    /**
    * Your app code here
    */

    pkcs11.C_Logout(session);
    pkcs11.C_CloseSession(session);
}
catch (e) {
    console.error(e, 'error');
}
finally {
    pkcs11.C_Finalize();
}