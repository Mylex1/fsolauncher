/* global io Howl */
var remote = require( 'electron' ).remote;
var Socket = io(
  'http://' +
    remote.getGlobal( 'WEBSERVICE' ) +
    ':' +
    remote.getGlobal( 'SOCKET_ENDPOINT' )
);

Socket.on( 'receive global message', function( data ) {
  FSOLauncher.fireEvent( 'SOCKET_MESSAGE', [data.Message, data.Url] );
} );

setInterval( function() {
  // credits tsomania.net
  var currenttime = new Date() ;
  var hours = currenttime.getUTCHours();
  var minutes = currenttime.getUTCMinutes();
  var seconds = currenttime.getUTCSeconds();
  var timesuffix = "AM";
  var cycle = 0;
  if ( hours %2 ==1 ) {
    cycle = 3600;
    timesuffix = "PM";
  }
  cycle = cycle + minutes * 60 + seconds;
  var tsohours =  Math.floor( cycle /300 );
  if ( tsohours > 12 ) {
    tsohours = tsohours - 12;
  }
  if ( tsohours ==0 ) {
    tsohours = 12;
  }
  var tsomins = Math.floor( ( cycle % 300 ) / 5 );
  if ( tsomins < 10 ) {
    tsomins = "0" + tsomins;
  }
  var simTime = document.getElementById( 'simtime' );
  if( simTime ) {
    simTime.innerHTML= tsohours + ":" + tsomins + " " + timesuffix ;
  }
}, 1000 );

var hasAlreadyLoaded = false;
var simitoneRequirementsCheckInterval;
var simitoneSuggestedUpdate;
var platform = document.querySelector( 'html' ).className;

var Electron = require( 'electron' ),
  ipcRenderer = Electron.ipcRenderer,
  rss = require( 'rss-parser' ),
  cloudscraper = require( 'cloudscraper' ),
  FSOLauncher = function() {
    this.fireEvent( 'INIT_DOM' );
    this.changePage( 'home' );
    this.loadRss();
  };
var detectedPath;
FSOLauncher.prototype.setDetectorResponse = function( dir ) {
  detectedPath = dir;
  if ( dir ) {
    document.getElementById( 'detector-response' ).style.display = 'block';
    document.getElementById( 'detector-response-path' ).innerHTML = dir;
  } else {
    document.getElementById( 'detector-response' ).style.display = 'none';
  }
};
FSOLauncher.prototype.sendDetectedPathConfirm = function() {
  FSOLauncher.fireEvent( 'FSODETECTOR_CONFIRM', detectedPath );
};
FSOLauncher.prototype.simitoneInstalled = function() {
  document.getElementById( 'simitone-page' ).classList.add( 'simitone-installed' );
};
FSOLauncher.prototype.simitoneNotInstalled = function() {
  document
    .getElementById( 'simitone-page' )
    .classList.remove( 'simitone-installed' );
};
FSOLauncher.prototype.ts1Installed = function() {
  document.getElementById( 'simitone-page' ).classList.add( 'ts1cc-installed' );
};
FSOLauncher.prototype.ts1NotInstalled = function() {
  document.getElementById( 'simitone-page' ).classList.remove( 'ts1cc-installed' );
};
FSOLauncher.prototype.simitoneShouldUpdate = function() {
  document
    .getElementById( 'simitone-page' )
    .classList.add( 'simitone-should-update' );
  document.getElementById(
    'simitone-update-version'
  ).innerHTML = simitoneSuggestedUpdate;
};
FSOLauncher.prototype.simitoneShouldntUpdate = function() {
  document
    .getElementById( 'simitone-page' )
    .classList.remove( 'simitone-should-update' );
};
FSOLauncher.prototype.ago = function( date ) {
  var seconds = Math.floor( ( new Date() - date ) / 1000 );
  var months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  var minutes;
  var hours;
  var days;
  if ( seconds < 5 ) {
    return 'just now';
  } else if ( seconds < 60 ) {
    return seconds + ' seconds ago';
  } else if ( seconds < 3600 ) {
    minutes = Math.floor( seconds / 60 );
    if ( minutes > 1 ) return minutes + ' minutes ago';
    else return '1 minute ago';
  } else if ( seconds < 86400 ) {
    hours = Math.floor( seconds / 3600 );
    if ( hours > 1 ) return hours + ' hours ago';
    else return '1 hour ago';
  }
  //2 days and no more
  else if ( seconds < 172800 ) {
    days = Math.floor( seconds / 86400 );
    if ( days > 1 ) return days + ' days ago';
    else return '1 day ago';
  } else {
    //return new Date(time).toLocaleDateString();
    return (
      date.getDate().toString() +
      ' ' +
      months[date.getMonth()] +
      ', ' +
      date.getFullYear()
    );
  }
};

FSOLauncher.prototype.fireEvent = function( a, b ) {
  ipcRenderer.send( a, b );
};
FSOLauncher.prototype.registerServerEvent = function( a, b ) {
  ipcRenderer.on( a, b );
};
FSOLauncher.prototype.setTheme = function( a ) {
  var date = new Date();
  var m = date.getMonth();
  var d = date.getDate();
  if ( ( m == 9 && d >= 30 && d <= 31 ) || ( m == 10 && d == 1 ) ) {
    document.querySelector( 'body' ).className = 'halloween';
  } else {
    document.querySelector( 'body' ).className = a;
  }
};
FSOLauncher.prototype.removeToast = function( id ) {
  var el = document.getElementById( id );
  if ( el ) el.parentNode.removeChild( el );
};
FSOLauncher.prototype.toast = function( id, message ) {
  var div = document.createElement( 'div' );
  div.style.display = 'block';
  div.className = 'toast';
  div.id = id;

  var i = document.createElement( 'i' );
  i.className = 'fa fa-refresh fa-spin';

  var span = document.createElement( 'span' );
  span.className = 'toast-message';

  span.innerHTML = message;

  div.appendChild( i );
  div.appendChild( span );

  document.querySelector( '#debug' ).appendChild( div );
};
FSOLauncher.prototype.registerUIEvent = function( a, b, c ) {
  a.tagName
    ? a.addEventListener( b, c )
    : document.querySelector( a ).addEventListener( b, c );
};
FSOLauncher.prototype.loadRss = function() {
  cloudscraper.get(
    document.querySelector( 'body' ).getAttribute( 'rss' ),
    ( err, response, body ) => {
      rss.parseString( body, function( a, b ) {
        if ( !a ) {
          hasAlreadyLoaded = true;
        }
        document.querySelector( '#did-you-know' ).style.display = 'block';
        document.querySelector( '#rss-loading' ).style.display = 'none';
        a
          ? ( document.querySelector( '#rss .alt-content' ).style.display =
              'block' )
          : ( ( document.querySelector( '#rss .alt-content' ).style.display =
              'none' ),
            ( document.querySelector( '#rss-root' ).innerHTML = '' ),
            b.feed.entries.forEach( function( a ) {
              var b = document.createElement( 'div' ),
                c = document.createElement( 'h1' ),
                g = document.createElement( 'span' ),
                d = document.createElement( 'div' ),
                h = document.createElement( 'a' );
              b.className = 'rss-entry';
              c.innerHTML = a.title;
              g.innerHTML = a.pubDate.replace( '+0000', '' ).slice( 0, -9 );
              d.className = 'rss-content';

              var ct = a.content.replace( /\s{2,}/g, ' ' ).replace( /\n/g, '' );

              d.innerHTML = ct;
              h.innerHTML = document
                .querySelector( 'body' )
                .getAttribute( 'rmstr' );
              h.className = 'button';
              h.setAttribute( 'href', a.link );
              h.setAttribute( 'target', '_blank' );
              b.appendChild( c );
              b.appendChild( g );
              b.appendChild( d );
              b.appendChild( h );
              document.querySelector( '#rss-root' ).appendChild( b );
            } ) );
      } );
    }
  );
};
FSOLauncher.prototype.registerUIEventAll = function( a, b, c ) {
  var e = document.querySelectorAll( a );
  for ( a = 0; a < e.length; a++ )
    e[a].addEventListener( b, function( a ) {
      c( a, e );
    } );
};
FSOLauncher.prototype.showHints = function( a ) {
  for (
    var b = document.querySelectorAll( '[hint-page]' ), c = 0;
    c < b.length;
    c++
  )
    b[c].style.display = 'none';
  if ( !localStorage['HINT_' + a] ) {
    b = document.querySelectorAll( '[hint-page="' + a + '"]' );
    for ( c = 0; c < b.length; c++ )
      ( b[c].style.display = 'block' ),
        b[c].addEventListener( 'click', function( a ) {
          a.currentTarget.style.display = 'none';
        } );
    localStorage.setItem( 'HINT_' + a, !0 );
  }
};
var prevTheme;
FSOLauncher.prototype.changePage = function( a ) {
  if ( a == 'simitone' ) {
    prevTheme = document.querySelector( 'body' ).className;
    FSOLauncher.setTheme( 'simitone' );
    FSOLauncher.fireEvent( 'CHECK_SIMITONE' );
    simitoneRequirementsCheckInterval &&
      clearInterval( simitoneRequirementsCheckInterval );
    simitoneRequirementsCheckInterval = setInterval( () => {
      FSOLauncher.fireEvent( 'CHECK_SIMITONE' );
    }, 60000 );
  } else {
    if ( prevTheme ) {
      FSOLauncher.setTheme( prevTheme );
      prevTheme = null;
    }
    if ( simitoneRequirementsCheckInterval ) {
      clearInterval( simitoneRequirementsCheckInterval );
      simitoneRequirementsCheckInterval = null;
    }
  }
  for (
    var z = document.querySelectorAll( 'li[page-trigger]' ), x = 0;
    x < z.length;
    x++
  ) {
    z[x].className = z[x].className.replace( 'active', '' );
  }

  document.querySelector( "li[page-trigger='" + a + "']" ).className += ' active';

  for (
    var b = document.querySelectorAll( 'div.page' ), c = b.length - 1;
    0 <= c;
    c--
  )
    b[c].style.display = 'none';
  document.querySelector( '#' + a + '-page' ).style.display = 'block';
  this.showHints( a );
};
FSOLauncher.prototype.restoreConfiguration = function( a ) {
  for ( var Section in a )
    for ( var Item in a[Section] ) {
      var b = document.querySelector(
        '[option-id="' + Section + '.' + Item + '"'
      );
      if( platform !== "darwin" || Item != 'GraphicsMode' ) {
        b && ( b.value = a[Section][Item] );
      }
    }
};
FSOLauncher.prototype.updateFullInstallProgressItem = function( a, b, c, e ) {
  var f = document.querySelector( '#full-install' );
  if ( a && b && c ) {
    var g = document.querySelector( '#full-install-title' ),
      d = document.querySelector( '#full-install-text1' ),
      h = document.querySelector( '#full-install-text2' ),
      k = document.querySelector( '#full-install-progress' );
    g.innerHTML = a;
    d.innerHTML = b;
    h.innerHTML = c;
    k.style.width = e + '%';
    f.style.display = 'block';
  } else f.style.display = 'none';
};

FSOLauncher.prototype.createNotification = function( title, body, url ) {
  document.querySelector( '#notifications-page .alt-content' ).style.display =
    'none';

  var id = Math.floor( Date.now() / 1000 );

  var notification = document.createElement( 'div' );
  notification.className = 'notification';
  notification.setAttribute( 'data-url', url );
  notification.id = 'FSONotification' + id;

  var i = document.createElement( 'i' );
  i.className = 'material-icons';
  i.innerHTML = 'notifications_empty';

  var h1 = document.createElement( 'h1' );
  h1.innerHTML = title;

  var span = document.createElement( 'span' );
  span.innerHTML = new Date().toLocaleString();

  var p = document.createElement( 'p' );
  p.innerHTML = body;

  if ( url ) {
    var btn = document.createElement( 'a' );
    btn.className = 'button material-icons';
    btn.target = '_blank';
    btn.style = 'float:right;margin-top:-15px;border-radius:50%';
    btn.innerHTML = 'link';
    btn.href = url;
  }

  notification.appendChild( i );
  notification.appendChild( h1 );
  notification.appendChild( p );
  notification.appendChild( span );

  if ( url ) notification.appendChild( btn );

  var contentContainer = document.querySelector(
    '#notifications-page .page-content'
  );
  contentContainer.innerHTML =
    notification.outerHTML + contentContainer.innerHTML;

  document.querySelector( '#FSONotification' + id + ' p' ).addEventListener(
    'click',
    function( e ) {
      require( 'electron' ).shell.openExternal( e.target.getAttribute( 'data-url' ) );
    },
    false
  );
};
FSOLauncher.prototype.createOrModifyProgressItem = function( a, b, c, e, f, g ) {
  document.querySelector( '#downloads-page .alt-content' ).style.display = 'none';
  var d = document.getElementById( a );
  if ( d )
    ( d.querySelector( 'h1' ).innerHTML = b ),
      ( d.querySelector( 'span' ).innerHTML = c ),
      ( d.querySelector( '.info' ).innerHTML = e ),
      ( d.querySelector( '.progress' ).style.width = f + '%' ),
      g
        ? ( ( d.querySelector( '.loading' ).style.display = 'none' ),
          ( f = d.querySelector( '.miniconsole' ) ),
          ( f.innerHTML += g ),
          ( f.style.display = 'block' ),
          ( f.scrollTop = f.scrollHeight ) )
        : ( ( d.querySelector( '.loading' ).style.display = 'block' ),
          ( d.querySelector( '.miniconsole' ).style.display = 'none' ) );
  else {
    d = document.createElement( 'div' );
    d.className = 'download';
    d.setAttribute( 'id', a );
    a = document.createElement( 'h1' );
    a.innerHTML = b;
    b = document.createElement( 'span' );
    b.innerHTML = c;
    c = document.createElement( 'div' );
    c.className = 'info';
    c.innerHTML = e;
    e = document.createElement( 'div' );
    e.className = 'loading';
    var h = document.createElement( 'div' );
    h.className = 'miniconsole';
    g
      ? ( ( e.style.display = 'none' ),
        ( h.innerHTML += g ),
        ( h.style.display = 'block' ),
        ( h.scrollTop = h.scrollHeight ) )
      : ( ( e.style.display = 'block' ), ( h.style.display = 'none' ) );
    g = document.createElement( 'div' );
    g.className = 'progress';
    g.style.width = f + '%';
    e.appendChild( g );
    d.appendChild( a );
    d.appendChild( b );
    d.appendChild( c );
    d.appendChild( h );
    d.appendChild( e );
    document.querySelector( '#downloads-page .page-content' ).innerHTML =
      d.outerHTML +
      document.querySelector( '#downloads-page .page-content' ).innerHTML;
  }
};
var yesNoAudio = new Howl( { src: 'fsolauncher_sounds/modal.wav', volume: 0.4 } );
FSOLauncher.prototype.yesNo = function( a, b, c, e, f, g ) {
  yesNoAudio.play();
  var d = document.createElement( 'div' );
  d.className = 'modal';
  var h = document.createElement( 'h1' );
  h.innerHTML = a;
  d.appendChild( h );
  a = document.createElement( 'p' );
  a.innerHTML = b;
  d.appendChild( a );
  b = document.createElement( 'div' );
  a = document.createElement( 'button' );
  a.innerHTML = c;
  a.addEventListener( 'click', function() {
    d.parentNode.removeChild( d );

    if ( document.querySelectorAll( '.modal' ).length == 0 ) {
      document.querySelector( '#overlay' ).style.display = 'none';
    }

    f && ipcRenderer.send( f, !0, g );
  } );
  b.appendChild( a );
  e
    ? ( ( c = document.createElement( 'span' ) ),
      ( c.innerHTML = e ),
      c.addEventListener( 'click', function() {
        d.parentNode.removeChild( d );
        if ( document.querySelectorAll( '.modal' ).length == 0 ) {
          document.querySelector( '#overlay' ).style.display = 'none';
        }
        document.querySelector( '#overlay' ).style.display = 'none';
        f && ipcRenderer.send( f, !1, g );
      } ),
      b.appendChild( c ) )
    : ( a.style.margin = '0px' );
  d.appendChild( b );
  document.querySelector( '#launcher' ).appendChild( d );
  document.querySelector( '#overlay' ).style.display = 'block';
};
FSOLauncher = new FSOLauncher();

FSOLauncher.registerServerEvent( 'FSODETECTOR_RESPONSE', function( a, b ) {
  FSOLauncher.setDetectorResponse( b );
} );
FSOLauncher.registerServerEvent( 'HAS_INTERNET', function() {
  document.body.className = document.body.className.replace( 'no-internet', '' );
  var tw = document.querySelector( '#tw' ).cloneNode( true );
  var par = document.querySelector( '#tw' ).parentNode;
  par.removeChild( document.querySelector( '#tw' ) );
  par.appendChild( tw );
  if ( !hasAlreadyLoaded ) {
    FSOLauncher.loadRss();
  }
} );
FSOLauncher.registerServerEvent( 'REMESH_INFO', function( a, v ) {
  if ( v ) {
    const i = parseInt( v );
    const f = FSOLauncher.ago( new Date( i * 1000 ) );

    const seconds = Math.floor( ( new Date() - new Date( i * 1000 ) ) / 1000 );

    if ( seconds < 172800 ) {
      if ( Math.floor( seconds / 86400 ) <= 1 ) {
        document.querySelector( '.new' ).style.display = 'block';
      } else {
        document.querySelector( '.new' ).style.display = 'none';
      }
    } else {
      document.querySelector( '.new' ).style.display = 'none';
    }

    document.querySelector( '#remeshinfo' ).style.display = 'block';
    document.querySelector( '#remeshinfo' ).innerHTML =
      '<i style="vertica-align:middle;float:left;margin-right:5px" class="material-icons">access_time</i> <span style="line-height:25px">' +
      f +
      '</span>';
  }
} );
FSOLauncher.registerServerEvent( 'SIMITONE_SHOULD_UPDATE', function( a, b ) {
  if ( !b ) {
    simitoneSuggestedUpdate = null;
    FSOLauncher.simitoneShouldntUpdate();
    return;
  }
  simitoneSuggestedUpdate = b;
  FSOLauncher.simitoneShouldUpdate();
} );
FSOLauncher.registerServerEvent( 'NO_INTERNET', function() {
  document.body.className += ' no-internet';
} );
FSOLauncher.registerServerEvent( 'SET_THEME', function( a, b ) {
  FSOLauncher.setTheme( b );
} );
FSOLauncher.registerServerEvent( 'SET_TIP', function( a, b ) {
  document.querySelector( '#tip-text' ).innerHTML = b;
} );
FSOLauncher.registerServerEvent( 'TOAST', function( a, t, c ) {
  FSOLauncher.toast( t, c );
} );
FSOLauncher.registerServerEvent( 'NOTIFLOG', function( a, t, l, c ) {
  FSOLauncher.createNotification( t, l, c );
} );
FSOLauncher.registerServerEvent( 'REMOVE_TOAST', function( a, t ) {
  FSOLauncher.removeToast( t );
} );
FSOLauncher.registerServerEvent( 'POPUP', function( a, b, c, e, f, g, d ) {
  FSOLauncher.yesNo( b, c, e, f, g, d );
} );
FSOLauncher.registerServerEvent( 'RESTORE_CONFIGURATION', function( a, b ) {
  FSOLauncher.restoreConfiguration( b );
} );
FSOLauncher.registerServerEvent( 'CHANGE_PAGE', function( a, b ) {
  FSOLauncher.changePage( b );
} );
FSOLauncher.registerServerEvent( 'INSPROG', function( a, b ) {
  if ( b ) {
    if ( b.FSO ) {
      document.querySelector( '.item[install=FSO]' ).className = 'item installed';
    } else {
      document.querySelector( '.item[install=FSO]' ).className = 'item';
    }
    if ( b.TSO ) {
      document.querySelector( '.item[install=TSO]' ).className = 'item installed';
    } else {
      document.querySelector( '.item[install=TSO]' ).className = 'item';
    }
    if ( b.NET ) {
      document.querySelector( '.item[install=NET]' ).className = 'item installed';
    } else {
      document.querySelector( '.item[install=NET]' ).className = 'item';
    }
    if ( b.OpenAL ) {
      document.querySelector( '.item[install=OpenAL]' ).className =
        'item installed';
    } else {
      document.querySelector( '.item[install=OpenAL]' ).className = 'item';
    }
    if ( b.TS1 ) {
      FSOLauncher.ts1Installed();
    } else {
      FSOLauncher.ts1NotInstalled();
    }
    if ( b.Simitone ) {
      FSOLauncher.simitoneInstalled();
    } else {
      FSOLauncher.simitoneNotInstalled();
    }
    if ( b.Mono ) {
      document.querySelector( '.item[install=Mono]' ).className =
        'item installed';
    } else {
      document.querySelector( '.item[install=Mono]' ).className = 'item';
    }
    if ( b.SDL ) {
      document.querySelector( '.item[install=SDL]' ).className =
        'item installed';
    } else {
      document.querySelector( '.item[install=SDL]' ).className = 'item';
    }
  }
} );
FSOLauncher.registerServerEvent( 'STOP_PROGRESS_ITEM', function( a, b ) {
  var pi = document.querySelector( '#' + b );

  if ( pi ) {
    pi.className = 'download stopped';
  }
} );
FSOLauncher.registerServerEvent( 'PLAY_SOUND', function( a, b ) {
  var audio = new Howl( { src: `fsolauncher_sounds/${b}.wav`, volume: 0.4 } );
  audio.play();
} );
FSOLauncher.registerServerEvent( 'CONSOLE_LOG', function( a, b ) {
  console.log( b );
} );
FSOLauncher.registerServerEvent( 'CREATE_PROGRESS_ITEM', function(
  a,
  b,
  c,
  e,
  f,
  g,
  d
) {
  FSOLauncher.createOrModifyProgressItem( b, c, e, f, g, d );
} );
FSOLauncher.registerServerEvent( 'FULL_INSTALL_PROGRESS_ITEM', function(
  a,
  b,
  c,
  e,
  f
) {
  FSOLauncher.updateFullInstallProgressItem( b, c, e, f );
} );
FSOLauncher.registerUIEvent( '.launch', 'click', function( _a ) {
  FSOLauncher.fireEvent( 'PLAY' );
} );
FSOLauncher.registerUIEvent( '#simitone-play-button', 'click', function( _a ) {
  FSOLauncher.fireEvent( 'PLAY_SIMITONE' );
} );
FSOLauncher.registerUIEvent( '.launch', 'contextmenu', function( _a ) {
  FSOLauncher.fireEvent( 'PLAY', true );
} );
FSOLauncher.registerUIEvent( '#simitone-play-button', 'contextmenu', function(
  _a
) {
  FSOLauncher.fireEvent( 'PLAY_SIMITONE', true );
} );
FSOLauncher.registerUIEvent( '#full-install-button', 'click', function() {
  FSOLauncher.fireEvent( 'FULL_INSTALL' );
} );
FSOLauncher.registerUIEvent( '#update-check', 'click', function() {
  FSOLauncher.fireEvent( 'CHECK_UPDATES' );
} );
FSOLauncher.registerUIEvent( '#simitone-install-button', 'click', function() {
  FSOLauncher.fireEvent( 'INSTALL', 'Simitone' );
} );
FSOLauncher.registerUIEvent( '#simitone-should-update', 'click', function() {
  FSOLauncher.fireEvent( 'INSTALL_SIMITONE_UPDATE' );
} );
FSOLauncher.registerUIEvent( '#detector-confirm', 'click', function() {
  FSOLauncher.sendDetectedPathConfirm();
} );
FSOLauncher.registerUIEventAll( '[option-id]', 'change', function( a, _b ) {
  var c = a.currentTarget.getAttribute( 'option-id' ),
    e = a.currentTarget.value;
  'Launcher.Theme' === c && FSOLauncher.setTheme( e );
  c = c.split( '.' );
  FSOLauncher.fireEvent( 'SET_CONFIGURATION', [c[0], c[1], e] );
} );
var audioPageTrigger = new Howl( { src: `fsolauncher_sounds/click.wav`, volume: 0.4 } );
FSOLauncher.registerUIEventAll( '[page-trigger]', 'click', function( a, _b ) {
  audioPageTrigger.play();
  FSOLauncher.changePage( a.currentTarget.getAttribute( 'page-trigger' ) );
} );
FSOLauncher.registerUIEventAll( '[install]', 'click', function( a, _b ) {
  var c = a.currentTarget.getAttribute( 'install' );
  FSOLauncher.fireEvent( 'INSTALL', c );
} );
