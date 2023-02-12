export class Args {
    args?: {
        documentSigner:{
            args: {
                digestSigner: {
                    factory : "de.intarsys.security.app.signature.SignerFactory"
                    args: {
                        device: "default@demo"
                    }
                }
                field: {
                    position: "100x100"
                    size: "200x100"
                    pageRange: "all"
                }
                decorator: {
                    factory: "de.intarsys.security.document.type.pdf.signature.ExtendedDecoratorFactory"
                }
                args: {
                    text: "Signed by ${digestsigner.subject.CN}"
                }
            }
        }
    }
}