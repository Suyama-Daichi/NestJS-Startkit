'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">nestjs-startkit documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AppModule-26d49dc9ebbd23bec133bc23d22545cf2b72805b984fc07fb4d0040e8940b4cb82b0ed9ff7de7fa5b7767735c7e628122527cdb9fc22f638ecd0e9ff8b5b3d68"' : 'data-target="#xs-controllers-links-module-AppModule-26d49dc9ebbd23bec133bc23d22545cf2b72805b984fc07fb4d0040e8940b4cb82b0ed9ff7de7fa5b7767735c7e628122527cdb9fc22f638ecd0e9ff8b5b3d68"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-26d49dc9ebbd23bec133bc23d22545cf2b72805b984fc07fb4d0040e8940b4cb82b0ed9ff7de7fa5b7767735c7e628122527cdb9fc22f638ecd0e9ff8b5b3d68"' :
                                            'id="xs-controllers-links-module-AppModule-26d49dc9ebbd23bec133bc23d22545cf2b72805b984fc07fb4d0040e8940b4cb82b0ed9ff7de7fa5b7767735c7e628122527cdb9fc22f638ecd0e9ff8b5b3d68"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-26d49dc9ebbd23bec133bc23d22545cf2b72805b984fc07fb4d0040e8940b4cb82b0ed9ff7de7fa5b7767735c7e628122527cdb9fc22f638ecd0e9ff8b5b3d68"' : 'data-target="#xs-injectables-links-module-AppModule-26d49dc9ebbd23bec133bc23d22545cf2b72805b984fc07fb4d0040e8940b4cb82b0ed9ff7de7fa5b7767735c7e628122527cdb9fc22f638ecd0e9ff8b5b3d68"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-26d49dc9ebbd23bec133bc23d22545cf2b72805b984fc07fb4d0040e8940b4cb82b0ed9ff7de7fa5b7767735c7e628122527cdb9fc22f638ecd0e9ff8b5b3d68"' :
                                        'id="xs-injectables-links-module-AppModule-26d49dc9ebbd23bec133bc23d22545cf2b72805b984fc07fb4d0040e8940b4cb82b0ed9ff7de7fa5b7767735c7e628122527cdb9fc22f638ecd0e9ff8b5b3d68"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AuthModule-170c1be46af6ee0ece2c3c87c4b81b4e897f1788fc3fb22563e4b045eec262b031c33d881bf234bdab337397a66da0fc8ecddd62ea9c6d4c3dafd1f18d2a1c26"' : 'data-target="#xs-controllers-links-module-AuthModule-170c1be46af6ee0ece2c3c87c4b81b4e897f1788fc3fb22563e4b045eec262b031c33d881bf234bdab337397a66da0fc8ecddd62ea9c6d4c3dafd1f18d2a1c26"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-170c1be46af6ee0ece2c3c87c4b81b4e897f1788fc3fb22563e4b045eec262b031c33d881bf234bdab337397a66da0fc8ecddd62ea9c6d4c3dafd1f18d2a1c26"' :
                                            'id="xs-controllers-links-module-AuthModule-170c1be46af6ee0ece2c3c87c4b81b4e897f1788fc3fb22563e4b045eec262b031c33d881bf234bdab337397a66da0fc8ecddd62ea9c6d4c3dafd1f18d2a1c26"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AuthModule-170c1be46af6ee0ece2c3c87c4b81b4e897f1788fc3fb22563e4b045eec262b031c33d881bf234bdab337397a66da0fc8ecddd62ea9c6d4c3dafd1f18d2a1c26"' : 'data-target="#xs-injectables-links-module-AuthModule-170c1be46af6ee0ece2c3c87c4b81b4e897f1788fc3fb22563e4b045eec262b031c33d881bf234bdab337397a66da0fc8ecddd62ea9c6d4c3dafd1f18d2a1c26"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-170c1be46af6ee0ece2c3c87c4b81b4e897f1788fc3fb22563e4b045eec262b031c33d881bf234bdab337397a66da0fc8ecddd62ea9c6d4c3dafd1f18d2a1c26"' :
                                        'id="xs-injectables-links-module-AuthModule-170c1be46af6ee0ece2c3c87c4b81b4e897f1788fc3fb22563e4b045eec262b031c33d881bf234bdab337397a66da0fc8ecddd62ea9c6d4c3dafd1f18d2a1c26"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#controllers-links"' :
                                'data-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AuthenticateRequestDto.html" data-type="entity-link" >AuthenticateRequestDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ChangePasswordRequestDto.html" data-type="entity-link" >ChangePasswordRequestDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ForgotPasswordRequestDto.html" data-type="entity-link" >ForgotPasswordRequestDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/RegisterRequestDto.html" data-type="entity-link" >RegisterRequestDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/VerifyCodeRequestDto.html" data-type="entity-link" >VerifyCodeRequestDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/VerifyIdTokenDto.html" data-type="entity-link" >VerifyIdTokenDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PrismaService.html" data-type="entity-link" >PrismaService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SentryInterceptor.html" data-type="entity-link" >SentryInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TimeoutInterceptor.html" data-type="entity-link" >TimeoutInterceptor</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/JwtAuthGuard.html" data-type="entity-link" >JwtAuthGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});